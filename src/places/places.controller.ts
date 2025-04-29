import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    ParseIntPipe,
  } from '@nestjs/common';
import { PlacesService } from './places.service';
import { CreatePlaceDto } from './dto/crate-places.dto';
import { Place } from './entities/places.entity';
import { UpdatePlaceDto } from './dto/update-places.dto';

  @Controller('places')
  export class PlacesController {
    constructor(private readonly placesService: PlacesService) {}
  
    @Post()
    create(@Body() createPlaceDto: CreatePlaceDto): Promise<Place> {
      return this.placesService.create(createPlaceDto);
    }
  
    @Get()
    findAll(): Promise<Place[]> {
      return this.placesService.findAll();
    }
  
    @Get(':id')
    findOne(@Param('id', ParseIntPipe) id: number): Promise<Place> {
      return this.placesService.findOne(id);
    }
  
    @Patch(':id')
    update(
      @Param('id', ParseIntPipe) id: number,
      @Body() updatePlaceDto: UpdatePlaceDto,
    ): Promise<Place> {
      return this.placesService.update(id, updatePlaceDto);
    }
  
    @Delete(':id')
    remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
      return this.placesService.remove(id);
    }
  }
  