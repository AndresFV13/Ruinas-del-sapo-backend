import { Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'places' })
export class places {

    @PrimaryGeneratedColumn()
    id: number
}