import { Body, Controller, Post } from '@nestjs/common';
import { CreateRolDto } from './dto/create-rol.dto';
import { RolService } from './rol.service';

@Controller('rol')
export class RolController {

    constructor(private rolesService: RolService) {}

    @Post()
    create(@Body() rol: CreateRolDto){
        return this.rolesService.create(rol);
    }
}
