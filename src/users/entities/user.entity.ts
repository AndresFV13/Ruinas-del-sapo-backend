import { Billing } from 'src/billing/entities/billing.entity';
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

  @Column({ name: 'last_name', length: 255 })
  lastName: string;

  @Column({ length: 255, unique: true })
  email: string;

  @Column({ length: 255 })
  password: string;

  @Column({ length: 20, nullable: true })
  phone: string;

  @Column({ nullable: true })
  facebook: string;

  @Column({ name: 'x_account', nullable: true }) 
  x: string;

  @Column({ nullable: true })
  linkedin: string;

  @Column({ nullable: true })
  instagram: string;

  @Column({ name: 'role_id' })
  roleId: number;

  @ManyToOne(() => Role, (role) => role.users, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'role_id' })
  role: Role;

  @OneToMany(() => Billing, (billing) => billing.user)
  billings: Billing[];

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
