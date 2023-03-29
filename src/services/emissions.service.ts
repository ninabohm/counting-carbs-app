import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ClimatiqRequest } from '../domain/model/climatiq.model';
import { firstValueFrom, map } from 'rxjs';
import { AxiosResponse } from 'axios';
import {
  mapGoogleValuesToClimatiqBody,
  mapPlaidValuesToClimatiqBody,
} from './mappers/mapPlaidValuesToClimatiqBody';
import { Activity, Emission, Prisma } from '@prisma/client';
import { PrismaService } from './prisma.service';
import { EmissionModel } from '../domain/model/emission.model';
import { EmissionCategoryModel } from '../domain/model/emissionCategory.model';
import { setTimeFrame } from '../utils/time-utils';

@Injectable()
export class EmissionsService {
  constructor(
    private readonly httpService: HttpService,
    private prisma: PrismaService,
  ) {}

  async findAll(request): Promise<Emission[]> {
    const user = await this.prisma.user.findFirst({
      where: { firebaseId: request.user.uid },
    });
    return await this.prisma.emission.findMany({
      include: {
        activity: true,
      },
      where: {
        activity: {
          userId: user.id,
        },
      },
    });
  }

  async emission(
    emissionWhereUniqueInput: Prisma.EmissionWhereUniqueInput,
  ): Promise<Emission | null> {
    return this.prisma.emission.findUnique({
      where: emissionWhereUniqueInput,
    });
  }

  async createEmission(data: Prisma.EmissionCreateInput): Promise<Emission> {
    return this.prisma.emission.create({
      data,
    });
  }

  async addEmissionFromActivity(activityId: number): Promise<EmissionModel> {
    const activity: Activity = await this.prisma.activity.findUnique({
      where: { id: activityId },
    });
    let emissionAmount;
    if (activity.type === 'journey') {
      emissionAmount = await this.getEmissionValue(
        activity.amount,
        undefined,
        activity.subCategory,
      );
    } else {
      emissionAmount = await this.getEmissionValue(
        activity.amount,
        activity.categoryId,
      );
    }

    const data = {
      emissionAmount: emissionAmount,
      unit: 'kg',
      activity: {
        connect: { id: activityId },
      },
    };

    await this.createEmission(data);

    return {
      emissionAmount: data.emissionAmount,
      unit: data.unit,
    };
  }

  async getEmissionValue(
    originalValue: number,
    categoryId?: number,
    category?: string,
  ) {
    let climatiqBody;
    if (categoryId !== undefined) {
      climatiqBody = mapPlaidValuesToClimatiqBody(categoryId, originalValue);
    } else {
      climatiqBody = mapGoogleValuesToClimatiqBody(category, originalValue);
    }
    return await this.getClimatiqData(climatiqBody);
  }

  async getClimatiqData(climatiqBody: ClimatiqRequest) {
    const url = 'https://beta3.api.climatiq.io/estimate';
    const climatiqToken = process.env.CLIMATIQ_API_TOKEN;
    const headers = { Authorization: 'Bearer ' + climatiqToken };
    return await firstValueFrom(
      this.httpService
        .post(
          url,
          {
            emission_factor: climatiqBody.emissionFactor,
            parameters: climatiqBody.parameters,
          },
          { headers: headers },
        )
        .pipe(
          map((axiosResponse: AxiosResponse) => {
            return axiosResponse.data?.co2e;
          }),
        ),
    );
    }

    async getEmissions(type: string, time: string, request) {
        const user = await this.prisma.user.findFirst({
            where: { firebaseId: request.user.uid },
        });
        let emissions;
        switch (type) {
            case 'all':
                emissions = await this.getEmissionSums(time, user);
                break;
            case 'categories':
                emissions = await this.getEmissionsPerTimeAndCategory(time, user);
                break;
            case 'stacked':
                emissions = await this.getStackedEmissions(time, user);
                break;
            default:
                emissions = await this.getEmissionsPerTimeAndSubcategory(
                    type,
                    time,
                    user,
                );
                break;
        }
        return emissions;
    }

  async getEmissionsPerTimeAndCategory(time: string, user) {
      const timeframe: string[] = setTimeFrame(time);
    const emissionsPerCategory: Array<EmissionCategoryModel> = [];
    let emissions;
    const categories = [
      'Food and Drink',
      'Recreation',
      'Healthcare',
      'Community',
      'Travel',
      'Shops',
      'Bank',
      'Service',
    ];

    for (let i = 0; i < categories.length; i++) {
      let totalAmount = 0;
      for (let j = 0; j < timeframe.length; j++) {
        emissions = await this.prisma.emission.findMany({
          where: {
            activity: {
              userId: user.id,
              category: categories[i],
              datetime: { contains: timeframe[j] },
            },
          },
          select: {
            emissionAmount: true,
          },
        });
        for (const emission of emissions) {
          totalAmount = totalAmount + (await emission.emissionAmount);
        }
      }

      const emissionElement: EmissionCategoryModel = {
        category: categories[i],
        emissionAmount: totalAmount,
        };
      emissionsPerCategory.push(emissionElement);
    }
    return emissionsPerCategory;
    }

    async getStackedEmissions(time: string, user) {
        const timeframe: string[] = setTimeFrame(time);
        if (time == 'weekly') {
            const stackedEmissions = this.transformStackedWeeks(timeframe, user);
            return stackedEmissions;
        }
        const stackedEmissions: {
            [timeframe: string]: Array<EmissionCategoryModel>
        } = {}
        let emissions;
        for (const frame of timeframe) {
            emissions = await this.getEmissionsPerTimeAndCategory(frame, user);
            stackedEmissions[frame] = emissions;
        }
        return stackedEmissions;
    }

    async transformStackedWeeks(timeframe, user) {
        let emissions = [];
        const stackedEmissions: {
            [timeframe: string]: Array<String>
        } = {}
        
        const week1: string[] = timeframe.slice(0, 7);
        const week2: string[] = timeframe.slice(7, 14);
        const week3: string[] = timeframe.slice(14, 21);
        const week4: string[] = timeframe.slice(21, 28);
        const weeks: {
            [timeframe: string]: Array<String>
        } = { ['week1']: week1, ['week2']: week2, ['week3']: week3, ['week4']: week4 }
      
        for (const week in weeks) {
            emissions = await this.sumUpWeeks(user, weeks[week]);
            stackedEmissions[week] = emissions;
        }
        return stackedEmissions;        
    }

    async sumUpWeeks(user, week) {
        let emissions;
        let dayEmissions = [];
        let amount: number = 0;
        let weekEmissions = [];

        for (const day of week) {
            emissions = await this.getEmissionsPerTimeAndCategory(day, user);
            dayEmissions.push(emissions);
        }
        for (let i = 0; i < 8; i++) {
            amount = 0;
            for (let j = 0; j < dayEmissions.length; j++) {
                amount = amount + dayEmissions[j][i].emissionAmount;
            }
            const emissionElement: EmissionCategoryModel = {
                category: dayEmissions[0][i].category,
                emissionAmount: amount
            };
            weekEmissions.push(emissionElement);
        }
        return weekEmissions;
    }

  async getEmissionSums(time: string, user) {
    let emissions;
    const timeframe: string[] = setTimeFrame(time);
    let emissionsPerTime: Array<EmissionCategoryModel> = [];
    let transformIntoWeeks = false;
    if (time == 'weekly') {
      transformIntoWeeks = true;
    }
    for (let i = 0; i < timeframe.length; i++) {
      let totalAmount = 0;
      emissions = await this.prisma.emission.findMany({
        where: {
          activity: { userId: user.id, datetime: { contains: timeframe[i] } },
        },
        select: { emissionAmount: true },
      });
      for (const emission of emissions) {
        totalAmount = totalAmount + (await emission.emissionAmount);
      }
      const emissionElement: EmissionCategoryModel = {
        category: timeframe[i],
        emissionAmount: totalAmount,
      };
      emissionsPerTime.push(emissionElement);
    }
    if (transformIntoWeeks == true) {
      emissionsPerTime = this.transformWeeks(emissionsPerTime);
    }

    return emissionsPerTime;
  }

  transformWeeks(emissions: Array<EmissionCategoryModel>) {
    const emissionWeekly: Array<EmissionCategoryModel> = [];
    let amount = 0;
    let weekNumber;
    for (let i = 0; i < emissions.length; i++) {
      amount = amount + emissions[i].emissionAmount;
      if (i == 6 || i == 13 || i == 20 || i == 27) {
        switch (i) {
          case 6:
            weekNumber = 4;
            break;
          case 13:
            weekNumber = 3;
            break;
          case 20:
            weekNumber = 2;
            break;
          case 27:
            weekNumber = 1;
            break;
        }
          const weekEmission: EmissionCategoryModel = {
           category: 'Week' + weekNumber,
           emissionAmount: amount,
        };
        emissionWeekly.push(weekEmission);
        amount = 0;
      }
    }
    return emissionWeekly;
  }

    async getEmissionsPerTimeAndSubcategory(type: string, time: string, user) {
      const emissionsPerCategory: Array<EmissionCategoryModel> = [];
      let emissions;
      const timeframe: string[] = setTimeFrame(time);
      for (let i = 0; i < timeframe.length; i++) {
        emissions = await this.prisma.emission.findMany({
        where: {
          activity: {
            userId: user.id,
            category: { contains: type },
            datetime: { contains: timeframe[i] },
          },
        },
        select: {
          emissionAmount: true,
          activity: {
            select: {
              datetime: true,
              amount: true,
              subCategory: true,
              category: true,
              unit: true,
            },
          },
        },
        });
          for (const emission of emissions) {
              emissionsPerCategory.push(emission);
          }
      }
    return emissionsPerCategory;
  }

  uniqueBySet(emissions: string[]) {
    return [...new Set(emissions)];
  }

  async deleteEmission(emissionId: string) {
    const id: number = Math.floor(+emissionId);
    return await this.prisma.emission.delete({
      where: { id: id },
    });
  }
}
