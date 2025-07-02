import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { PlacesService } from './places.service';
import { CreatePlaceDto } from './dto/crate-places.dto';
import { Place } from './entities/places.entity';
import { UpdatePlaceDto } from './dto/update-places.dto';
import { cloudinaryStorage } from '../cloudinary/cloudinary.storage';


  @Controller('places')
  export class PlacesController {
    constructor(private readonly placesService: PlacesService) {}
  
    @Post()
    @UseInterceptors(FileInterceptor('image', { storage: cloudinaryStorage }))
    async create(
      @UploadedFile() file: Express.Multer.File,
      @Body() createPlaceDto: CreatePlaceDto,
    ): Promise<Place> {
      if (file) {
        createPlaceDto.image = file.path; 
      }
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
    @UseInterceptors(FileInterceptor('image', { storage: cloudinaryStorage }))
    update(
      @Param('id', ParseIntPipe) id: number,
      @UploadedFile() file: Express.Multer.File,
      @Body() updatePlaceDto: UpdatePlaceDto,
    ): Promise<Place> {
      if (file) {
        updatePlaceDto.image = `/uploads/places/${file.filename}`;
      }
      return this.placesService.update(id, updatePlaceDto);
    }
  
    @Delete(':id')
    remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
      return this.placesService.remove(id);
    }
  }
  