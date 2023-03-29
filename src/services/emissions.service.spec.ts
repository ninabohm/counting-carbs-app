import { EmissionsService } from './emissions.service';
import { HttpService } from '@nestjs/axios';
import { EmissionModel } from '../domain/model/emission.model';

describe.skip('EmissionsService', () => {
  let emissionsService: EmissionsService;
  let httpService: HttpService;
  let prisma;
  let mockRequest;

  beforeEach(() => {
    prisma = {
      emission: {
        findMany: jest
          .fn()
          .mockResolvedValueOnce([
            { id: 1, emissionAmount: 30, unit: 'kg', activityId: 1 },
          ]),
        create: jest.fn().mockResolvedValueOnce({}),
        delete: jest.fn().mockResolvedValueOnce({}),
        findUnique: jest.fn().mockResolvedValueOnce({}),
      },
      user: {
        findFirst: jest.fn().mockResolvedValueOnce({}),
      },
      activity: {
        findUnique: jest.fn().mockResolvedValueOnce({ id: 1 }),
      },
    };
    emissionsService = new EmissionsService(httpService, prisma);
    mockRequest = { user: { uid: '123' } };
  });

  it('should return the amount of carbon emissions', async () => {
    const result = await emissionsService.getEmissionValue(19025004, 500);
    const expected = 30;
    expect(result).toEqual(expected);
  });

  it('should return an emission based on an activity', async () => {
    const emissionModel: EmissionModel = {
      emissionAmount: 2.4,
      unit: 'kg',
    };
    const result = await emissionsService.addEmissionFromActivity(1);

    expect(result).toEqual({
      emissionAmount: 2.4,
      unit: 'kg',
      datetime: expect.any(String),
      category: 'Shops',
      subCategory: 'Supermarket',
      originalValue: 40,
    });
  });

  it('should return an array with length 8 for the 7 categories+total', async () => {
    const result = await emissionsService.getEmissionsPerTimeAndCategory(
      'week',
      mockRequest,
    );
    expect(result.length).toEqual(8);
  });

  it('should return an array with length 7 for daily', async () => {
    const result = await emissionsService.getEmissionSums('daily', mockRequest);
    expect(result.length).toEqual(7);
  });

  it('should return an array with length 4 for weekly', async () => {
    const result = await emissionsService.getEmissionSums(
      'weekly',
      mockRequest,
    );
    expect(result.length).toEqual(4);
  });

  it.skip('should return an array with length 12 for monthly', async () => {
    const result = await emissionsService.getEmissionSums(
      'monthly',
      mockRequest,
    );
    expect(result.length).toEqual(12);
  });

  it('should return all emissions for the current user', async () => {
    const result = await emissionsService.findAll(mockRequest);
    expect(result).toEqual([
      { id: 1, emissionAmount: 30, unit: 'kg', activityId: 1 },
    ]);
  });
});
