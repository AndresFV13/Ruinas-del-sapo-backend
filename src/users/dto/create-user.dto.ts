// src/users/dto/create-user.dto.ts
import { IsString, IsEmail, IsNotEmpty, MinLength, IsInt } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @IsEmail()
  @IsNotEmpty()
  readonly email: string;

  @IsString()
  @MinLength(8)
  readonly password: string;

  @IsInt()
  readonly roleId: number;
}
