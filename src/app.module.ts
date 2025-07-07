import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { RolModule } from './rol/rol.module';
import { PlacesModule } from './places/places.module';
import { PlansModule } from './plans/plans.module';
import { ReservationsModule } from './reservations/reservations.module';
import { BlogModule } from './blog/blog.module';
import { BillingModule } from './billing/billing.module';
import { CalendarEventModule } from './calendar/calendar.module';
import { AuthModule } from './auth/auth.module';
import { StatsService } from './stats/stats.service';
import { StatsModule } from './stats/stats.module';
import { CloudinaryService } from './cloudinary/cloudinary.service';
import { CloudinaryController } from './cloudinary/cloudinary.controller';
import { CloudinaryModule } from './cloudinary/cloudinary.module';
import { AppGateway } from './socketIO/app.getway';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'uploads'),
      serveRoot: '/uploads',
    }),

    // Configuración de TypeORM
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: process.env.DB_PORT ? parseInt(process.env.DB_PORT) : 3306,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true, 
    }),

    UsersModule,
    RolModule,
    PlacesModule,
    PlansModule,
    ReservationsModule,
    BlogModule,
    BillingModule,
    CalendarEventModule,
    AuthModule,
    StatsModule,
    CloudinaryModule
  ],
  controllers: [AppController, CloudinaryController],
  providers: [AppService, StatsService, CloudinaryService, AppGateway],
  exports: [AppGateway]
})
export class AppModule {}
