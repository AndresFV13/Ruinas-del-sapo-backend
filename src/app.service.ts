import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Servidot corriendo en el puerto http://localhost:3000';
  }
}
