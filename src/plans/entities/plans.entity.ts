import { Place } from 'src/places/entities/places.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToMany,
  JoinTable,
} from 'typeorm';

@Entity('plans')
export class Plan {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToMany(() => Place, (place) => place.plans, {
    cascade: true,          
    onDelete: 'CASCADE',
  })
  @JoinTable({
    name: 'plans_places',     
    joinColumn: {
      name: 'plan_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'place_id',
      referencedColumnName: 'id',
    },
  })
  places: Place[];          

  @Column({ length: 100 })
  title: string;

  @Column('text')
  description: string;

  @Column({ nullable: true })
  image: string;

  @Column('simple-array', { nullable: true })
  additional: string[];

  @Column({ type: 'int' })
  price: number;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
