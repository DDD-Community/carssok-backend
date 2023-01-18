import { json } from 'stream/consumers';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Model } from './model.entity';
import { Car } from '../../car/entities/car.entity';

@Entity()
export class Detail {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  year: string;

  @Column()
  rate: string;

  @Column({ nullable: true })
  title: string;

  @Column({ type: 'json' })
  detail: JSON;

  @ManyToOne(() => Model, { cascade: true, onDelete: 'CASCADE' })
  model: Model;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
