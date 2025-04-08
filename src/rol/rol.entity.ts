import { User } from "src/users/user.entity";
import { Column, ManyToMany, PrimaryColumn } from "typeorm";

export class Rol{

    @PrimaryColumn()
    id: number;

    @Column({unique: true})
    name: string; 

    @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
    created_at: Date;

    @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
    updated_at: Date;

    @ManyToMany(() => User, (user) => user.roles)
    users: User[]
}