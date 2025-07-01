import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CalendarEvent } from './entities/calendar.entity';
import { CalendarEventService } from './calendar.service';
import { CalendarEventController } from './calendar.controller';

@Module({
  imports: [TypeOrmModule.forFeature([CalendarEvent])],
  providers: [CalendarEventService],
  controllers: [CalendarEventController],
})
export class CalendarEventModule {}
