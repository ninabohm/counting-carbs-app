import { HttpService } from '@nestjs/axios';
import { PlaidController } from './plaid.controller';
import { PlaidService } from '../services/plaid.service';
import { PrismaService } from '../services/prisma.service';
import { ActivitiesService } from '../services/activities.service';

describe.skip('PlaidController', () => {
  let plaidController: PlaidController;
  let plaidService: PlaidService;
  let httpService: HttpService;
  let prisma: PrismaService;
  let activitiesService: ActivitiesService;

  beforeEach(async () => {
    plaidService = new PlaidService(httpService, prisma, activitiesService);
    plaidController = new PlaidController(plaidService);
  });
  it.skip('should return a link token', () => {
    expect(plaidController.createLinkToken()).toEqual(null);
  });
});
