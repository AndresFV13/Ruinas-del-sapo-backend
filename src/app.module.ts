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
import { ConfigModule } from '@nestjs/config';
import { AppGateway } from './socketIO/app.getway';

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
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'password',
      database: 'ruinas_del_sapo_db',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true, // En producción, usar migraciones en vez de synchronize
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
