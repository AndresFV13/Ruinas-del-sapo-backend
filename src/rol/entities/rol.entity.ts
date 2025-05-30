import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    OneToMany,
  } from 'typeorm';
  import { User } from '../../users/entities/user.entity';
  
  @Entity('roles')
  export class Role {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column({ name: 'rol' })
    name: string;
  
    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;
  
    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt: Date;
  
    @OneToMany(() => User, (user) => user.role)
    users: User[];
  }
  