// src/plans/plans.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PlansService } from './plans.service';
import { PlansController } from './plans.controller';
import { Plan } from './entities/plans.entity';
import { Place } from 'src/places/entities/places.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Plan, Place])],
  providers: [PlansService],
  controllers: [PlansController],
})
export class PlansModule {}
