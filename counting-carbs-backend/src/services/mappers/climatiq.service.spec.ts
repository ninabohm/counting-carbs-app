import { ActivitiesService } from '../activities.service';
import { EmissionsService } from '../emissions.service';
import { HttpService } from '@nestjs/axios';
import { BaseFirestoreRepository } from 'fireorm';
import { ActivityModel } from '../../domain/model/activity.model';
import { exposeMockFirebaseApp } from 'mock-firebase-ts';
import { defaultApp } from '../../firebase';
import { ClimatiqRequest } from '../../domain/model/climatiq.model';
import { mapPlaidValuesToClimatiqBody } from './mapPlaidValuesToClimatiqBody';

describe('climatiqService', () => {
  beforeEach(async () => {
    jest.useFakeTimers();
    const mocked = exposeMockFirebaseApp(defaultApp);
  });

  it('should return the climatiq body ', () => {
    const categoryId = 13005053;
    const originalValue = 40;
    const climatiqBody: ClimatiqRequest = {
      parameters: { money: 40, money_unit: 'usd' },
      emissionFactor: {
        activity_id: 'consumer_goods-type_bread_other_baked_goods',
      },
    };
    expect(mapPlaidValuesToClimatiqBody(categoryId, originalValue)).toEqual(
      climatiqBody,
    );
  });

  it('should throw an exception', () => {
    const categoryId = 100;
    const originalValue = 40;
    const climatiqBody: ClimatiqRequest = {
       parameters: { money: 40, money_unit: 'usd' },
       emissionFactor: "Na",
    };
    expect(mapPlaidValuesToClimatiqBody(categoryId, originalValue)).toEqual(
      climatiqBody);
  });
});
