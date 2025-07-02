import { Controller, Get } from '@nestjs/common';
import { StatsService } from './stats.service';

@Controller('stats')
export class StatsController {
  constructor(private readonly statsService: StatsService) {}

  @Get('total')
  getTotalReservations() {
    return this.statsService.countAll();
  }

  @Get('active')
  getActiveReservations() {
    return this.statsService.countActive();
  }
}
