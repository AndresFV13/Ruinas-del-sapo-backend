// src/places/dto/update-place.dto.ts
import { PartialType } from '@nestjs/mapped-types';
import { CreatePlaceDto } from './crate-places.dto';

export class UpdatePlaceDto extends PartialType(CreatePlaceDto) {}
