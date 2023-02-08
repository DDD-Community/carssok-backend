import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Car } from '../../car/entities/car.entity';
import { Model } from './model.entity';

@Entity()
export class Brand {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ nullable: true })
  brand: string;

  @Column()
  logo: string;

  @Column({ default: false })
  isDomestic: boolean;

  @Column()
  arrangeOrder: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(() => Model, (model) => model.brand)
  model: Model[];

  @OneToMany(() => Car, (car) => car.brand)
  car: Car[];
}
