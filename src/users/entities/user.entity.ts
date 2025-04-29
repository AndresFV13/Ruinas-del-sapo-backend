import { Billing } from 'src/billing/entities/billing.entity';
import { Reservation } from 'src/reservations/entities/reservations.entity';
import { Role } from 'src/rol/entities/rol.entity';
import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    ManyToOne,
    JoinColumn,
    OneToMany,
  } from 'typeorm';
  
  @Entity('users')
  export class User {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column({ length: 255 })
    name: string;
  
    @Column({ length: 255, unique: true })
    email: string;
  
    @Column({ length: 255 })
    password: string;
  
    @Column({ name: 'role_id' })
    roleId: number;
  
    @ManyToOne(() => Role, (role) => role.users, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'role_id' })
    role: Role;
  
    @OneToMany(() => Reservation, (reservation) => reservation.user)
    reservations: Reservation[];
  
    @OneToMany(() => Billing, (billing) => billing.user)
    billings: Billing[];
  
    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;
  
    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt: Date;
  }
  