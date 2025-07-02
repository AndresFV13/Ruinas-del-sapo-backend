import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';
import { Reservation } from './entities/reservations.entity';
import { CreateReservationDto } from './dto/create-reservations.dto';
import { UpdateReservationDto } from './dto/update-reservations.dto';

@Injectable()
export class ReservationsService {
  constructor(
    @InjectRepository(Reservation)
    private readonly reservationRepo: Repository<Reservation>,
    private readonly entityManager: EntityManager,
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

  async countMonthlyReservations(): Promise<number[]> {
    const results = await this.reservationRepo
      .createQueryBuilder("reservation")
      .select("MONTH(reservation.reservationDate)", "month")
      .addSelect("COUNT(*)", "count")
      .where("reservation.status != :status", { status: "cancelled" })
      .groupBy("month")
      .orderBy("month", "ASC")
      .getRawMany();

    const months = Array(12).fill(0);

    results.forEach((row) => {
      const index = parseInt(row.month, 10) - 1;
      months[index] = parseInt(row.count, 10);
    });

    return months;
  }

  async getMonthlyStats(): Promise<{
    monthTotal: number;
    todayTotal: number;
  }> {
    const now = new Date();
    const firstDayOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const todayStart = new Date(now.setHours(0, 0, 0, 0));
    const todayEnd = new Date(now.setHours(23, 59, 59, 999));

    const monthTotalResult = await this.reservationRepo
      .createQueryBuilder('reservation')
      .select('SUM(reservation.planPrice)', 'total')
      .where('reservation.status != :status', { status: 'cancelled' })
      .andWhere('reservation.reservationDate >= :start', { start: firstDayOfMonth })
      .getRawOne();

    const todayTotalResult = await this.reservationRepo
      .createQueryBuilder('reservation')
      .select('SUM(reservation.planPrice)', 'total')
      .where('reservation.status != :status', { status: 'cancelled' })
      .andWhere('reservation.reservationDate BETWEEN :start AND :end', {
        start: todayStart,
        end: todayEnd,
      })
      .getRawOne();

    return {
      monthTotal: parseInt(monthTotalResult.total ?? '0', 10),
      todayTotal: parseInt(todayTotalResult.total ?? '0', 10),
    };
  }

  async sumMonthlyIncome(): Promise<number[]> {
    const results = await this.reservationRepo
      .createQueryBuilder("reservation")
      .select("MONTH(reservation.reservationDate)", "month")
      .addSelect("SUM(reservation.planPrice)", "total")
      .where("reservation.status != :status", { status: "cancelled" })
      .groupBy("month")
      .orderBy("month", "ASC")
      .getRawMany();

    const months = Array(12).fill(0);
    results.forEach(row => {
      const index = parseInt(row.month, 10) - 1;
      months[index] = parseInt(row.total, 10);
    });

    return months;
  }
}