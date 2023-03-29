import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { PlaidController } from '../api/plaid.controller';
import { PlaidService } from './plaid.service';
import { PrismaService } from './prisma.service';
import { ActivitiesService } from './activities.service';
import { EmissionsService } from './emissions.service';

@Module({
  imports: [HttpModule],
  controllers: [PlaidController],
  providers: [PlaidService, PrismaService, ActivitiesService, EmissionsService],
})
export class PlaidModule {}
