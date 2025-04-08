import { Injectable } from '@nestjs/common';
import { Rol } from './rol.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateRolDto } from './dto/create-rol.dto';

@Injectable()
export class RolService {

    constructor(@InjectRepository(Rol) private rolesRespository: Repository<Rol>) {}

    create(rol: CreateRolDto){
        const newRol = this.rolesRespository.create(rol);
        return this.rolesRespository.save(newRol);
    }
}
