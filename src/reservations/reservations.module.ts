import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReservationsController } from './reservations.controller';
import { ReservationsService } from './reservations.service';
import { Reservation } from './entities/reservations.entity';
import { AppGateway } from 'src/socketIO/app.getway';

@Module({
  imports: [TypeOrmModule.forFeature([Reservation])],
  providers: [ReservationsService, AppGateway],
  controllers: [ReservationsController],
  exports: [ReservationsService, TypeOrmModule],
})
export class ReservationsModule {}