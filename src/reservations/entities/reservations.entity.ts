import { Place } from 'src/places/entities/places.entity';
import { User } from 'src/users/entities/user.entity';
import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    ManyToOne,
    JoinColumn,
  } from 'typeorm';
  
  @Entity('reservations')
  export class Reservation {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column({ name: 'user_id' })
    userId: number;
  
    @ManyToOne(() => User, (user) => user.reservations, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'user_id' })
    user: User;
  
    @Column({ type: 'int' })
    days: number;
  
    @Column({ name: 'places_id' })
    placeId: number;
  
    @ManyToOne(() => Place, (place) => place.reservations, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'places_id' })
    place: Place;
  
    @Column({ type: 'int', nullable: true })
    room?: number; 
  
    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;
  
    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt: Date;
  }
  