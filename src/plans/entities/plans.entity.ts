import { Place } from 'src/places/entities/places.entity';
import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    ManyToOne,
    JoinColumn,
  } from 'typeorm';
  
  @Entity('plans')
  export class Plan {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column({ name: 'places_id' })
    placeId: number;
  
    @ManyToOne(() => Place, (place) => place.plans, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'places_id' })
    place: Place;
  
    @Column()
    name: string;
  
    @Column({ type: 'timestamp', name: 'availability_start_date' })
    availabilityStartDate: Date;
  
    @Column({ type: 'timestamp', name: 'availability_end_date' })
    availabilityEndDate: Date;
  
    @Column({ type: 'int', nullable: true })
    maxParticipants?: number;
  
    @Column({ type: 'int' })
    price: number;
  
    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;
  
    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt: Date;
  }
  