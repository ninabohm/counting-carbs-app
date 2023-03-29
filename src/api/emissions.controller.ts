import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Request,
} from '@nestjs/common';
import { EmissionsService } from '../services/emissions.service';
import { Emission } from '@prisma/client';
import { EmissionModel } from '../domain/model/emission.model';

interface emissionRequest {
  user: { uid: string };
}

@Controller('emission')
export class EmissionsController {
  constructor(private readonly emissionsService: EmissionsService) {}
  @Get()
  getAllEmissions(@Request() request: emissionRequest): Promise<Emission[]> {
    if (request.user.uid === undefined) {
      throw new HttpException('Unauthorized', HttpStatus.BAD_REQUEST);
    }

    return this.emissionsService.findAll(request);
  }

  @Post()
  addEmission(@Body() activityId: number): Promise<EmissionModel> {
    return this.emissionsService.addEmissionFromActivity(activityId);
  }

  @Get(':type/:time')
  getEmissionsByTypeAndTime(
    @Param('type') type: string,
    @Param('time') time: string,
    @Request() request: emissionRequest,
  ): Promise<any> {
    return this.emissionsService.getEmissions(type, time, request);
  }

  @Delete(':id')
  deleteEmission(@Param('id') id: string): Promise<Emission> {
    return this.emissionsService.deleteEmission(id);
  }
}
