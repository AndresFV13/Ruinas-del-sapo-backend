import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StatsService } from './stats.service';
import { StatsController } from './stats.controller';
import { Reservation } from 'src/reservations/entities/reservations.entity';
import { ReservationsModule } from 'src/reservations/reservations.module';

@Module({
  imports: [ReservationsModule],
  providers: [StatsService],
  controllers: [StatsController],
})
export class StatsModule {}
