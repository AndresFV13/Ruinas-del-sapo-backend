import {
    Controller,
    Get,
    Post,
    Body,
    Param,
    Put,
    Delete,
    ParseIntPipe,
  } from '@nestjs/common';
import { ReservationsService } from './reservations.service';
import { CreateReservationDto } from './dto/create-reservations.dto';
import { UpdateReservationDto } from './dto/update-reservations.dto';
  
  @Controller('reservations')
  export class ReservationsController {
    constructor(private readonly reservationsService: ReservationsService) {}
  
    @Post()
    create(@Body() createReservationDto: CreateReservationDto) {
      return this.reservationsService.create(createReservationDto);
    }
  
    @Get()
    findAll() {
      return this.reservationsService.findAll();
    }
  
    @Get(':id')
    findOne(@Param('id', ParseIntPipe) id: number) {
      return this.reservationsService.findOne(id);
    }
  
    @Put(':id')
    update(
      @Param('id', ParseIntPipe) id: number,
      @Body() updateReservationDto: UpdateReservationDto,
    ) {
      return this.reservationsService.update(id, updateReservationDto);
    }
  
    @Delete(':id')
    remove(@Param('id', ParseIntPipe) id: number) {
      return this.reservationsService.remove(id);
    }
  }