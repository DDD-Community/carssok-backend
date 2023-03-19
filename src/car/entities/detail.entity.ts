import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
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

  @Column()
  fuel: string;

  @Column()
  engineType: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => Model, (model) => model.detail, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  model: Model;

  @OneToMany(() => Car, (car) => car.detail)
  car: Car[];
}
