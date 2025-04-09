import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { RolModule } from './rol/rol.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PlacesService } from './places/places.service';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      database: 'ruinas_del_sapo_db',
      entities: [__dirname + '/**/*.entity.{ts,js}'],
      synchronize: true
    }),
    UsersModule, 
    RolModule
  ],
  controllers: [AppController],
  providers: [AppService, PlacesService],
})
export class AppModule {}
