import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Place } from './entities/places.entity';
import { CreatePlaceDto } from './dto/crate-places.dto';
import { UpdatePlaceDto } from './dto/update-places.dto';


@Injectable()
export class PlacesService {
  constructor(
    @InjectRepository(Place)
    private readonly placesRepository: Repository<Place>,
  ) {}

  async create(createPlaceDto: CreatePlaceDto): Promise<Place> {
    const place = this.placesRepository.create(createPlaceDto);
    return this.placesRepository.save(place);
  }

  findAll(): Promise<Place[]> {
    return this.placesRepository.find();
  }

  async findOne(id: number): Promise<Place> {
    const place = await this.placesRepository.findOne({ where: { id } });
    if (!place) {
      throw new NotFoundException(`Place with ID ${id} not found`);
    }
    return place;
  }

  async update(id: number, updatePlaceDto: UpdatePlaceDto): Promise<Place> {
    await this.placesRepository.update(id, updatePlaceDto);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    const result = await this.placesRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Place with ID ${id} not found`);
    }
  }
}