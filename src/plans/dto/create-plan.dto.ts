// src/plans/dto/create-plan.dto.ts
import { IsString, IsNotEmpty, IsInt, IsDateString, IsOptional } from 'class-validator';

export class CreatePlanDto {
  @IsInt()
  readonly placeId: number;

  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @IsDateString()
  readonly availabilityStartDate: string;

  @IsDateString()
  readonly availabilityEndDate: string;

  @IsInt()
  @IsOptional()
  readonly maxParticipants?: number;

  @IsInt()
  readonly price: number;
}
