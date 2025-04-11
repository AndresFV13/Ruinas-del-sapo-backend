import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { RolModule } from './rol/rol.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PlacesService } from './places/places.service';
import { BlogController } from './blog/blog.controller';
import { BlogModule } from './blog/blog.module';
import { ReservationsController } from './reservations/reservations.controller';
import { ReservationsModule } from './reservations/reservations.module';

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
    RolModule, BlogModule, ReservationsModule
  ],
  controllers: [AppController, BlogController, ReservationsController],
  providers: [AppService, PlacesService],
})
export class AppModule {}
