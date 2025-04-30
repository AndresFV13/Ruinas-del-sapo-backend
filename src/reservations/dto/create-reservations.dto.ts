import { IsInt, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateReservationDto {
  @IsInt()
  readonly userId: number;

  @IsInt()
  @IsNotEmpty()
  readonly days: number;

  @IsInt()
  readonly placeId: number;

  @IsInt()
  @IsOptional()
  readonly room?: number;
}
