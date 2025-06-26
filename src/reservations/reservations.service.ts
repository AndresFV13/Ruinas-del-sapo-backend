import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Reservation } from './entities/reservations.entity';
import { CreateReservationDto } from './dto/create-reservations.dto';
import { UpdateReservationDto } from './dto/update-reservations.dto';

@Injectable()
export class ReservationsService {
  constructor(
    @InjectRepository(Reservation)
    private readonly reservationRepo: Repository<Reservation>,
  ) {}

  create(createReservationDto: CreateReservationDto): Promise<Reservation> {
    const reservation = this.reservationRepo.create(createReservationDto);
    return this.reservationRepo.save(reservation);
  }

  findAll(): Promise<Reservation[]> {
    return this.reservationRepo.find();
  }

  async findOne(id: number): Promise<Reservation> {
    try {
      return await this.reservationRepo.findOneOrFail({ where: { id } });
    } catch {
      throw new NotFoundException(`Reservation ${id} not found`);
    }
  }

  async update(
    id: number,
    updateReservationDto: UpdateReservationDto
  ): Promise<Reservation> {
    // esto ya llamará a findOne y lanzará 404 si no existe
    await this.reservationRepo.update(id, updateReservationDto);
    return this.findOne(id);
  }

  remove(id: number): Promise<void> {
    return this.reservationRepo.delete(id).then(() => undefined);
  }

  async cancel(id: number): Promise<Reservation> {
    const reservation = await this.findOne(id);
    reservation.status = 'cancelled';
    return this.reservationRepo.save(reservation);
  }
}