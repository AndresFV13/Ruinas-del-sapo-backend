import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CalendarEvent } from './entities/calendar.entity';
import { CreateCalendarEventDto } from './dto/create-calendar.dto';
import { UpdateCalendarEventDto } from './dto/update-calendar.dto';

@Injectable()
export class CalendarEventService {
  constructor(
    @InjectRepository(CalendarEvent)
    private readonly eventRepo: Repository<CalendarEvent>
  ) {}

  create(dto: CreateCalendarEventDto): Promise<CalendarEvent> {
    const event = this.eventRepo.create(dto);
    return this.eventRepo.save(event);
  }

  findAll(): Promise<CalendarEvent[]> {
    return this.eventRepo.find();
  }

  async findOne(id: number): Promise<CalendarEvent> {
    const event = await this.eventRepo.findOneBy({ id });
    if (!event) throw new NotFoundException(`Evento con ID ${id} no encontrado.`);
    return event;
  }

  async update(id: number, dto: UpdateCalendarEventDto): Promise<CalendarEvent> {
    await this.findOne(id);
    await this.eventRepo.update(id, dto);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    const res = await this.eventRepo.delete(id);
    if (res.affected === 0) throw new NotFoundException(`Evento con ID ${id} no encontrado.`);
  }
}
