import { HttpService } from '@nestjs/axios';
import { ActivitiesController } from './activities.controller';
import { ActivitiesService } from '../services/activities.service';
import { defaultApp } from '../firebase';
import { exposeMockFirebaseApp } from 'mock-firebase-ts';
import { EmissionsService } from '../services/emissions.service';
import { PrismaService } from '../services/prisma.service';
import { Activity } from '@prisma/client';

describe.skip('ActivitiesController', () => {
  let activitiesController: ActivitiesController;
  let activitiesService: ActivitiesService;
  let httpService: HttpService;
  let emissionService: EmissionsService;
  let prisma: PrismaService;

  beforeEach(() => {
    activitiesService = new ActivitiesService(
      httpService,
      emissionService,
      prisma,
    );
    activitiesController = new ActivitiesController(activitiesService);
    const mocked = exposeMockFirebaseApp(defaultApp);
  });

  it.skip('should return all activities', async () => {
    const mockResponse: Activity[] = [
      {
        id: 23,
        amount: 50,
        category: 'some category',
        subCategory: 'some subcategory',
        categoryId: 12345,
        datetime: 'date time',
        userId: 3,
        type: 'transaction',
        unit: 'EUR',
      },
    ];

    jest
      .spyOn(activitiesService, 'findAll')
      .mockResolvedValueOnce(mockResponse);

    const request: Request = {
      arrayBuffer(): Promise<ArrayBuffer> {
        return Promise.resolve(undefined);
      },
      blob(): Promise<Blob> {
        return Promise.resolve(undefined);
      },
      body: undefined,
      bodyUsed: false,
      cache: undefined,
      clone(): Request {
        return undefined;
      },
      credentials: undefined,
      destination: undefined,
      formData(): Promise<FormData> {
        return Promise.resolve(undefined);
      },
      headers: undefined,
      integrity: '',
      json(): Promise<any> {
        return Promise.resolve(undefined);
      },
      keepalive: false,
      method: '',
      mode: undefined,
      redirect: undefined,
      referrer: '',
      referrerPolicy: undefined,
      signal: undefined,
      text(): Promise<string> {
        return Promise.resolve('');
      },
      url: '',
    };

    expect(await activitiesController.getAllActivities(request)).toEqual(
      mockResponse,
    );
  });
});
