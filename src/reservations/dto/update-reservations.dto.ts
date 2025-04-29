
import { PartialType } from '@nestjs/mapped-types';
import { CreateReservationDto } from './create-reservations.dto';

export class UpdateReservationDto extends PartialType(CreateReservationDto) {}
