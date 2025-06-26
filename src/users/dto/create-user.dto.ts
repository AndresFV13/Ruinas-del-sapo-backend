import {
  IsString,
  IsEmail,
  IsOptional,
  IsNotEmpty,
  Length,
} from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  @Length(2, 255)
  name: string;

  @IsString()
  @IsNotEmpty()
  @Length(2, 255)
  lastName: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  @Length(6, 255)
  password: string;

  @IsString()
  @IsOptional()
  @Length(7, 20)
  phone?: string;

  @IsString()
  @IsOptional()
  facebook?: string;

  @IsString()
  @IsOptional()
  x?: string;

  @IsString()
  @IsOptional()
  linkedin?: string;

  @IsString()
  @IsOptional()
  instagram?: string;

  @IsNotEmpty()
  roleId: number;
}
