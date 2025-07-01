import { IsString, IsOptional, IsBoolean, IsDateString } from 'class-validator';

export class CreateCalendarEventDto {
  @IsString()
  title: string;

  @IsDateString()
  start: string;

  @IsOptional()
  @IsDateString()
  end?: string;

  @IsOptional()
  @IsBoolean()
  allDay?: boolean;

  @IsOptional()
  @IsString()
  calendar?: string;
}