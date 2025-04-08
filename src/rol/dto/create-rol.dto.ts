import { IsNotEmpty, IsString } from "class-validator";

export class CreateRolDto {

    @IsNotEmpty()
    @IsString()
    id: number

    @IsNotEmpty()
    @IsString()
    name: string;
}