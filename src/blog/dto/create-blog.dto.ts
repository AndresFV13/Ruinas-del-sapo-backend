import { IsNotEmpty, IsString } from "class-validator";

export class CreateBlogDto {

    @IsString()
    @IsNotEmpty()
    title: string;

    @IsString()
    content: string;

    @IsString()
    image: string;

    @IsString()
    @IsNotEmpty()
    status: string;
}