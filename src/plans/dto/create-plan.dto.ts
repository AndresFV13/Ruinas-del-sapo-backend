import {
  IsArray,
  ArrayNotEmpty,
  IsInt,
  IsString,
  IsNotEmpty,
  IsOptional,
  IsDateString,
  Min,
} from 'class-validator';
import { Type } from 'class-transformer';

export class CreatePlanDto {
  @IsArray()
  @ArrayNotEmpty()
  @IsInt({ each: true })
  @Type(() => Number)
  placeIds: number[];

  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsString()
  @IsOptional()
  image?: string;

  @IsArray()
  @IsOptional()
  @ArrayNotEmpty()
  @IsString({ each: true })
  additional?: string[];

  @IsDateString()
   @IsOptional()   
  availabilityStartDate: string;

  @IsDateString()
   @IsOptional()   
  availabilityEndDate: string;

  @IsInt()
  @Type(() => Number)
  @IsOptional()
  @Min(1)
  maxParticipants?: number;

  @IsInt()
  @Type(() => Number)
  @Min(0)
  price: number;
}
