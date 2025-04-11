import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateReservationsDto {


    @IsNumber()
    @IsNotEmpty()
    user_id: number;    

    @IsNumber()
    @IsNotEmpty()
    days: number;

    @IsString()
    @IsNotEmpty()
    places_id: number;

    @IsNumber()
    @IsNotEmpty()
    room: number;

    
}