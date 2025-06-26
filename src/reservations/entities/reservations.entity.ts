import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('reservations')
export class Reservation {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'first_name', length: 100 })
  firstName: string;

  @Column({ name: 'last_name', length: 100 })
  lastName: string;

  @Column({ unique: true, length: 200 })
  email: string;

  @Column({ name: 'phone', length: 20 })
  phone: string;

  @Column({ name: 'reservation_date' })
  reservationDate: Date;

  @Column({ default: false })
  confirmed: boolean;

  @Column({ name: 'plan_id', type: 'int' })
  planId: number;

  @Column({ name: 'plan_price', type: 'decimal', precision: 10, scale: 2 })
  planPrice: number;

  @Column({ name: 'adults', type: 'int', default: 0 })
  adults: number;

  @Column({ type: 'varchar', default: 'active' })
  status: 'active' | 'cancelled' | 'completed';

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}

