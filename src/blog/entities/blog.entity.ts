import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('blog')
export class Blog {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 200 })
  title: string;

  // Para textos largos sin límite práctico
  @Column({ type: 'text' })
  description: string;

  @Column({ type: 'text' })
  body: string;

  @Column({ nullable: true })
  image?: string;

  @Column({ nullable: true, default: 'draft' })
  status?: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
