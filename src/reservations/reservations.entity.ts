import { User } from "src/users/user.entity";
import { Places } from "src/places/places.entity";
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'reservations' })
export class Reservations {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    user_id: number;

    @Column()
    days: number;

    @Column()
    places_id: number;

    @Column()
    room: number;

    @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
    created_at: Date;

    @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
    updated_at: Date;

    @ManyToMany(() => User, user => user.reservations)
    user: User[];

    @ManyToMany(() => Places, places => places.reservations)
    places: Places[];
}