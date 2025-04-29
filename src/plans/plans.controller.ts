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
  import { PlansService } from './plans.service';
import { Plan } from './entities/plans.entity';
import { CreatePlanDto } from './dto/create-plans.dto';
import { UpdatePlanDto } from './dto/update-plans.dto';
  
  @Controller('plans')
  export class PlansController {
    constructor(private readonly plansService: PlansService) {}
  
    @Post()
    create(@Body() createPlanDto: CreatePlanDto): Promise<Plan> {
      return this.plansService.create(createPlanDto);
    }
  
    @Get()
    findAll(): Promise<Plan[]> {
      return this.plansService.findAll();
    }
  
    @Get(':id')
    findOne(@Param('id', ParseIntPipe) id: number): Promise<Plan> {
      return this.plansService.findOne(id);
    }
  
    @Patch(':id')
    update(
      @Param('id', ParseIntPipe) id: number,
      @Body() updatePlanDto: UpdatePlanDto,
    ): Promise<Plan> {
      return this.plansService.update(id, updatePlanDto);
    }
  
    @Delete(':id')
    remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
      return this.plansService.remove(id);
    }
  }