import { HttpService } from '@nestjs/axios';
import { ActivitiesService } from './activities.service';
import * as mockTransactions from '../../test/mockPlaidTransactions.json';
import * as mockTransaction from '../../test/mockPlaidTransaction.json';
import { exposeMockFirebaseApp } from 'mock-firebase-ts';
import { defaultApp } from '../firebase';
import { EmissionsService } from './emissions.service';
import { PrismaService } from './prisma.service';
import { mapPlaidTransactionToActivityData } from './mappers/mapPlaidTransactionToActivityData';
import { Activity } from '@prisma/client';
import { ActivityModel } from '../domain/model/activity.model';

describe('ActivitiesService', () => {
  let activitiesService: ActivitiesService;
  let emissionService: EmissionsService;
  let httpService: HttpService;
  let prisma: PrismaService;

  beforeEach(async () => {
    activitiesService = new ActivitiesService(
      httpService,
      emissionService,
      prisma,
    );
    jest.useFakeTimers();
    const mocked = exposeMockFirebaseApp(defaultApp);
  });

  it('should return an array of transactions', () => {
    expect(activitiesService.getTransactions()).toEqual(mockTransactions);
  });

  it('should return an activity based on a plaid transaction', () => {
    const transaction = mockTransaction;

      const activity: ActivityModel = {
       amount: 55.6,
      category: 'Shops',
      subCategory: 'Groceries',
      categoryId: 19013000,
      datetime: expect.any(String),
      type: 'transaction',
      unit: 'EUR'
    };
    expect(mapPlaidTransactionToActivityData(transaction)).toEqual(activity);
  });
});
