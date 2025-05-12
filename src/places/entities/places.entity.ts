import { Plan } from 'src/plans/entities/plans.entity';
import { Reservation } from 'src/reservations/entities/reservations.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToMany,
  OneToMany,
} from 'typeorm';

@Entity('places')
export class Place {
  @PrimaryGeneratedColumn()
  id: number; 

  @Column()
  name: string; 

  @Column({ nullable: true })
  image?: string;  

  @Column({ type: 'text', nullable: true })
  description?: string;  

  @ManyToMany(() => Plan, (plan) => plan.places)
  plans: Plan[]; 

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;  

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date; 
}
