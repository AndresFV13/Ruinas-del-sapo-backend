import { IsArray, IsEmail, IsNotEmpty, IsNumber, IsString, MinLength } from "class-validator";

export class CreateUsersDto{

    @IsNotEmpty()
    @IsString()
    name: string;

    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    @IsString()
    @MinLength(9)
    password: string;

    @IsNotEmpty()
    @IsString()
    authStrategy: string;

    @IsArray()
    @IsNumber({}, { each: true })
    roles: number[]; 
}