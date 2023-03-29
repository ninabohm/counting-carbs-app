import { EmissionsController } from './emissions.controller';
import { EmissionsService } from '../services/emissions.service';
import { HttpService } from '@nestjs/axios';
import { PrismaService } from '../services/prisma.service';
import { Emission } from '@prisma/client';

describe('EmissionsController', () => {
  let emissionsController: EmissionsController;
  let emissionsService: EmissionsService;
  let httpService: HttpService;
  let prisma: PrismaService;
  let mockRequest;

  beforeEach(() => {
    httpService = new HttpService();
    emissionsService = new EmissionsService(httpService, prisma);
    emissionsController = new EmissionsController(emissionsService);
    mockRequest = { user: { uid: '123' } };
  });

  it('should return all emissions for the current user', async () => {
    const mockResponse: Emission[] = [
      {
        id: 1,
        emissionAmount: 30,
        unit: 'kg',
        activityId: 1,
      },
      {
        id: 2,
        emissionAmount: 20,
        unit: 'kg',
        activityId: 2,
      },
    ];

    jest.spyOn(emissionsService, 'findAll').mockResolvedValueOnce(mockResponse);

    expect(await emissionsController.getAllEmissions(mockRequest)).toEqual(
      mockResponse,
    );
  });
});
