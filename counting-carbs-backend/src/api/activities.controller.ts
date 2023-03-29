import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Request,
} from '@nestjs/common';
import { ActivitiesService } from '../services/activities.service';
import { ActivityModel } from '../domain/model/activity.model';
import { Activity } from '@prisma/client';

@Controller('activity')
export class ActivitiesController {
  constructor(private readonly activitiesService: ActivitiesService) {}

  @Get()
  getAllActivities(
    @Request() request: Request,
  ): Promise<Array<Partial<Activity>>> {
    return this.activitiesService.findAll(request);
   }

  @Get('travelData')
    checkTravelData(@Request() request: Request) {
        return this.activitiesService.checkTravelData(request);
  }

  @Post('transaction')
  addActivityFromTransaction(
    @Body() transaction,
    @Request() request: Request,
  ): Promise<ActivityModel> {
    return this.activitiesService.addActivity(transaction, request);
  }

  @Post()
  addActivity(@Body() journey, @Request() request: Request) {
    return this.activitiesService.postActivities(journey, request);
  }

  @Delete(':id')
  deleteActivity(@Param('id') activityId: string) {
    return this.activitiesService.deleteActivity(activityId);
  }
}
