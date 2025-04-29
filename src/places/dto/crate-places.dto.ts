// src/places/dto/create-place.dto.ts
import { IsString, IsNotEmpty, IsOptional } from 'class-validator';

export class CreatePlaceDto {
  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @IsString()
  @IsOptional()
  readonly image?: string;

  @IsString()
  @IsOptional()
  readonly description?: string;
}
