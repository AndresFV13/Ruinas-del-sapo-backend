import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { PlansService } from './plans.service';
import { Plan } from './entities/plans.entity';
import { CreatePlanDto } from './dto/create-plan.dto';
import { UpdatePlanDto } from './dto/update-plan.dto';
import { cloudinaryStorage } from 'src/cloudinary/cloudinary.storage';

@Controller('plans')
export class PlansController {
  constructor(private readonly plansService: PlansService) {}

  @Post()
  @UseInterceptors(FileInterceptor('image', { storage: cloudinaryStorage }))
  async create(
    @UploadedFile() file: Express.Multer.File,
    @Body() body: any,
  ): Promise<Plan> {
    const dto = new CreatePlanDto();

    dto.title = body.title;
    dto.description = body.description;
    dto.price = parseInt(body.price);

    try {
      const parsed = JSON.parse(body.placeIds);
      if (Array.isArray(parsed)) {
        dto.placeIds = parsed.map(Number);
      } else {
        throw new Error('placeIds no es un arreglo');
      }
    } catch (e) {
      throw new Error('Error al parsear placeIds');
    }

    if (body.additional) {
      dto.additional = body.additional
        .split(',')
        .map((item: string) => item.trim())
        .filter(Boolean);
    }

    const now = new Date();
    dto.availabilityStartDate = now.toISOString();
    const tomorrow = new Date(now);
    tomorrow.setDate(tomorrow.getDate() + 1);
    dto.availabilityEndDate = tomorrow.toISOString();

    if (file) {
      dto.image = file.path;
    }

    return this.plansService.create(dto);
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
  @UseInterceptors(FileInterceptor('image', { storage: cloudinaryStorage }))
  async update(
    @Param('id', ParseIntPipe) id: number,
    @UploadedFile() file: Express.Multer.File,
    @Body() body: any,
  ): Promise<Plan> {
    const dto = new UpdatePlanDto();

    dto.title = body.title;
    dto.description = body.description;
    dto.price = parseInt(body.price);

    //Parsear placeIds
    try {
      const parsed = JSON.parse(body.placeIds);
      if (Array.isArray(parsed)) {
        dto.placeIds = parsed.map(Number);
      }
    } catch (e) {
      console.warn('No se pudo parsear placeIds');
    }

    if (body.additional) {
      dto.additional = body.additional
        .split(',')
        .map((item: string) => item.trim())
        .filter(Boolean);
    }

    if (file) {
      dto.image = file.path;;
    }

    return this.plansService.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.plansService.remove(id);
  }
}
