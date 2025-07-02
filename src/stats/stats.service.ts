
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Reservation } from 'src/reservations/entities/reservations.entity';
import { Repository, Not } from 'typeorm';

@Injectable()
export class StatsService {
  constructor(
    @InjectRepository(Reservation)
    private readonly reservationsRepo: Repository<Reservation>,
  ) {}

  /** Total de reservas */
  countAll(): Promise<number> {
    return this.reservationsRepo.count();
  }

  /** Reservas que NO están canceladas (asumo status = 'cancelled') */
  countActive(): Promise<number> {
    return this.reservationsRepo.count({
      where: { status: Not('cancelled') },
    });
  }
}
