import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateRolDto } from './dto/create-rol.dto';
import { Role } from './entities/rol.entity';

@Injectable()
export class RolService {

    constructor(@InjectRepository(Role) private rolesRespository: Repository<Role>) {}

    create(rol: CreateRolDto){
        const newRol = this.rolesRespository.create(rol);
        return this.rolesRespository.save(newRol);
    }
}
