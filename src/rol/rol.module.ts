import { Module } from '@nestjs/common';
import { RolService } from './rol.service';
import { RolController } from './rol.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { Role } from './entities/rol.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Role, User])],
  providers: [RolService],
  controllers: [RolController]
})
export class RolModule {}
