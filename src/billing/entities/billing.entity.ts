import { Reservation } from 'src/reservations/entities/reservations.entity';
import { User } from 'src/users/entities/user.entity';
import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    ManyToOne,
    JoinColumn,
  } from 'typeorm';
  
  @Entity('billing')
  export class Billing {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column({ name: 'reservations_id' })
    reservationId: number;
  
    @ManyToOne(() => Reservation, (res) => res.id, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'reservations_id' })
    reservation: Reservation;
  
    @Column({ name: 'user_id' })
    userId: number;
  
    @ManyToOne(() => User, (user) => user.billings, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'user_id' })
    user: User;
  
    @Column({ type: 'int', nullable: true })
    invoiceNumber?: number;
  
    @Column({ type: 'int', nullable: true })
    totalAmount?: number;
  
    @Column({ type: 'int', nullable: true })
    taxAmount?: number;
  
    @Column({ type: 'boolean', default: false })
    paymentStatus: boolean;
  
    @Column({ type: 'timestamp', name: 'invoice_date' })
    invoiceDate: Date;
  
    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;
  }
  