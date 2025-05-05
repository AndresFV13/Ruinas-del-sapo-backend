import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';
import { CreatePlanDto } from './dto/create-plan.dto';
import { UpdatePlanDto } from './dto/update-plan.dto';
import { Plan } from './entities/plans.entity';
import { Place } from 'src/places/entities/places.entity';

@Injectable()
export class PlansService {
  constructor(
    @InjectRepository(Plan)
    private readonly planRepository: Repository<Plan>,
    @InjectRepository(Place)
    private readonly placeRepository: Repository<Place>,  
  ) {}

  async create(createPlanDto: CreatePlanDto): Promise<Plan> {
    const places = await this.placeRepository.find({
      where: { id: In(createPlanDto.placeIds) },
    });
    if (places.length !== createPlanDto.placeIds.length) {
      throw new NotFoundException(`One or more places not found`);
    }

    const plan = this.planRepository.create({
      ...createPlanDto,
      places,
    });
    return this.planRepository.save(plan);                
  }

  findAll(): Promise<Plan[]> {
    return this.planRepository.find({ relations: ['places'] });
  }

  async findOne(id: number): Promise<Plan> {
    const plan = await this.planRepository.findOne({
      where: { id },
      relations: ['places'],
    });

    if (!plan) {
      throw new NotFoundException(`Plan with id ${id} not found`);
    }
    return plan;
  }

  async update(id: number, updatePlanDto: UpdatePlanDto): Promise<Plan> {
    let places: Place[] = [];
    if (updatePlanDto.placeIds) {
      places = await this.placeRepository.find({
        where: { id: In(updatePlanDto.placeIds) },
      });
      if (places.length !== updatePlanDto.placeIds.length) {
        throw new NotFoundException(`One or more places not found`);
      }
    }

    const plan = await this.planRepository.preload({
      id,
      ...updatePlanDto,
      ...(places.length ? { places } : {}),
    });
    if (!plan) {
      throw new NotFoundException(`Plan with id ${id} not found`);
    }
    return this.planRepository.save(plan);                    
  }

  async remove(id: number): Promise<void> {
    const plan = await this.findOne(id);
    await this.planRepository.remove(plan);
  }
}
