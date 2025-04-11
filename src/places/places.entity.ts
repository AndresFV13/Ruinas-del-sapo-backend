import { Reservations } from "src/reservations/reservations.entity";
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'places' })
export class Places {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string;

    @Column()
    image: string;

    @Column()
    description: string;

    @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
    created_at: Date;

    @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
    updated_at: Date;

    @ManyToMany(() => Reservations, reservations => reservations.places)
    reservations: Reservations[];    
}