import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { RolModule } from './rol/rol.module';

@Module({
  imports: [UsersModule, RolModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
