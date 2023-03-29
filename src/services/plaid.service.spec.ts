import { PlaidService } from './plaid.service';
import { ActivitiesService } from './activities.service';
import { HttpService } from '@nestjs/axios';
import { PrismaService } from './prisma.service';

describe('PlaidService', () => {
  let plaidService: PlaidService;
  let httpService: HttpService;
  let prisma: PrismaService;
  let activitiesService: ActivitiesService;
  let mockRequest;

  beforeEach(async () => {
    plaidService = new PlaidService(httpService, prisma, activitiesService);
    jest.useFakeTimers();
    mockRequest = { user: { uid: '123' } };
  });
  it.skip('should return an cursor thats null', () => {
    expect(plaidService.getCursor(mockRequest)).toEqual(null);
  });
});
