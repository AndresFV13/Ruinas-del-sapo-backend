import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm'; 
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { User } from 'src/users/entities/user.entity'; 

@Module({
  imports: [
    TypeOrmModule.forFeature([User]), 
    JwtModule.register({
      secret: 'mi_clave_secreta',
      signOptions: { expiresIn: '1d' },
    }),
  ],
  providers: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
