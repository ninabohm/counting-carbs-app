import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { EmissionsController } from '../api/emissions.controller';
import { EmissionsService } from './emissions.service';
import { PrismaService } from './prisma.service';

@Module({
  imports: [HttpModule],
  controllers: [EmissionsController],
  providers: [EmissionsService, PrismaService],
  exports: [EmissionsService],
})
export class EmissionsModule {}
