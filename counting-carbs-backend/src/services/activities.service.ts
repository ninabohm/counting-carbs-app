import { Inject, Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import * as mockTransactions from '../../test/mockPlaidTransactions.json';
import * as mockMobility from '../../test/mockGoogleMaps.json';
import { ActivityModel } from '../domain/model/activity.model';
import { MobilityModel } from '../domain/model/mobility.model';
import { EmissionsService } from './emissions.service';
import { Activity, Prisma } from '@prisma/client';
import { PrismaService } from './prisma.service';
import { mapPlaidTransactionToActivityData } from './mappers/mapPlaidTransactionToActivityData';
import {
  mapGoogleValuesToClimatiqBody,
  mapPlaidValuesToClimatiqBody,
} from './mappers/mapPlaidValuesToClimatiqBody';
import { mapGoogleActivitiesToActivityData } from './mappers/mapGoogleActivitiesToActivityData';
import { round } from 'lodash';

@Injectable()
export class ActivitiesService {
  constructor(
    private readonly httpService: HttpService,
    @Inject(EmissionsService)
    private readonly emissionsService: EmissionsService,
    private prisma: PrismaService,
  ) {}

  async activity(
    activityWhereUniqueInput: Prisma.ActivityWhereUniqueInput,
  ): Promise<Activity | null> {
    return this.prisma.activity.findUnique({
      where: activityWhereUniqueInput,
    });
  }

  async createActivity(data: Prisma.ActivityCreateInput): Promise<Activity> {
    return this.prisma.activity.create({
      data,
    });
  }

  async findAll(request): Promise<Array<Partial<Activity>>> {
    const user = await this.prisma.user.findFirst({
      where: { firebaseId: request.user.uid },
    });
    const activities = await this.prisma.activity.findMany({
      where: { userId: user.id },
      select: {
        id: true,
        category: true,
        amount: true,
        subCategory: true,
        datetime: true,
        emission: { select: { emissionAmount: true } },
      },
    });
    return activities;
  }

  getTransactions() {
    const transactions = mockTransactions;
    return transactions;
  }

  async addActivity(transaction, request): Promise<ActivityModel> {
    const activityData = mapPlaidTransactionToActivityData(transaction);
    const climatiqBody = mapPlaidValuesToClimatiqBody(
      activityData.categoryId,
      activityData.amount,
    );
    const userEntity = await this.prisma.user.findFirst({
      where: { firebaseId: request.user.uid },
    });
    if (climatiqBody.emissionFactor != 'Na') {
      const user = { userId: userEntity.id };
      const data = Object.assign(activityData, user);
      const activityEntity = await this.createActivity(data);
      await this.emissionsService.addEmissionFromActivity(activityEntity.id);
      return activityData;
    }
  }

  async deleteActivity(activityId: string) {
    const id: number = Math.floor(+activityId);
    try {
      await this.prisma.activity.delete({
        where: {
          id: id,
        },
      });
    } catch (exception) {
      console.log(exception);
    }
  }

  async postActivities(journey, request): Promise<MobilityModel[]> {
    const journeys: Array<MobilityModel> = await this.getJourneys(
      journey.timelineObjects,
    );
    for (const activity of journeys) {
      this.addActivityJourney(activity, request);
    }
    return journeys;
  }

  async addActivityJourney(activity, request): Promise<ActivityModel> {
    const activityData = mapGoogleActivitiesToActivityData(activity);
    const climatiqBody = mapGoogleValuesToClimatiqBody(
      activityData.subCategory,
      activityData.amount,
    );
    const userEntity = await this.prisma.user.findFirst({
      where: { firebaseId: request.user.uid },
    });
    if (climatiqBody.emissionFactor != 'Na') {
      const user = { userId: userEntity.id };
      const data = Object.assign(activityData, user);
      const activityEntity = await this.createActivity(data);
      await this.emissionsService.addEmissionFromActivity(activityEntity.id);
      return activityData;
    }
  }

  async getJourneys(journey) {
    const movements: Array<MobilityModel> = [];
    for (let i = 0; i < journey.length; i++) {
      try {
        const activityElement: MobilityModel = {
          category: journey[i].activitySegment.activityType,
          distance: await this.getDistance(journey[i]),
          datetime: journey[i].activitySegment.duration.startTimestamp,
        };
        movements.push(activityElement);
      } catch {}
    }
    for (const movement of movements) {
      movement.distance = round(movement.distance / 1000, 2);
      movement.datetime = movement.datetime.substring(0, 10);
    }
    return movements;
  }

  async getDistance(journey) {
    if (
      journey.activitySegment.activityType === 'IN_PASSENGER_VEHICLE' ||
      journey.activitySegment.activityType === 'IN_VEHICLE' ||
      journey.activitySegment.activityType === 'CYCLING' ||
      journey.activitySegment.activityType === 'WALKING'
    ) {
      return journey.activitySegment.waypointPath.distanceMeters;
    } else {
      return journey.activitySegment.simplifiedRawPath.distanceMeters;
    }
    }

    async checkTravelData(request) {
        let hasData = false;
        let travelData;
        const user = await this.prisma.user.findFirstOrThrow({
            where: { firebaseId: request.user.uid },
        });
        try {
            travelData = await this.prisma.emission.findFirst({
                where: {
                    activity: {
                        userId: user.id,
                        category: "Travel",
                    },
                }
            })
        }
        catch {}
        if (travelData != null) {
            hasData = true;
        }
        return { hasData: hasData };
    }
}
