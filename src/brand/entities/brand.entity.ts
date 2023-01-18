import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
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

  @OneToMany(() => Model, (model) => model.brand)
  model: Model[];

  @Column({ default: false })
  isDomestic: boolean;

  @Column()
  arrangeOrder: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
