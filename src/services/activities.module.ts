import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { ActivitiesService } from './activities.service';
import { ActivitiesController } from '../api/activities.controller';
import { EmissionsModule } from './emissions.module';
import { EmissionsService } from './emissions.service';
import { PrismaService } from './prisma.service';

@Module({
  imports: [HttpModule, EmissionsModule],
    controllers: [ActivitiesController],
    providers: [ActivitiesService, EmissionsService, PrismaService],
})
export class ActivitiesModule {}
