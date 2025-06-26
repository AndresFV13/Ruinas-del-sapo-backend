import { IsString, IsNotEmpty, IsOptional } from 'class-validator';

export class CreatePlaceDto {
  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @IsString()
  @IsOptional()
  image?: string;

  @IsString()
  @IsOptional()
  readonly description?: string;
}
