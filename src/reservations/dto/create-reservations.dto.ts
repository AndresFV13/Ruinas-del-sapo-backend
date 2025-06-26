import { IsString, IsEmail, IsDateString, IsBoolean, IsInt, Min, Max, IsOptional, IsIn } from 'class-validator';

export class CreateReservationDto {
  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsEmail()
  email: string;

  @IsString()
  phone: string;

  @IsDateString()
  reservationDate: string;

  @IsBoolean()
  confirmed: boolean;

  @IsInt()
  planId: number;

  @IsInt()
  @Min(0)
  planPrice: number;

  @IsInt()
  @Min(0)
  @Max(5)
  adults: number;

  @IsOptional()
  @IsIn(['active', 'cancelled', 'completed'])
  status?: 'active' | 'cancelled' | 'completed';
}
