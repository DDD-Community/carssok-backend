import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Brand } from './brand.entity';
import { Car } from '../../car/entities/car.entity';
import { Detail } from './detail.entity';

@Entity()
export class Model {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ nullable: true })
  title: string;

  @Column({ nullable: true })
  thumb: string;

  @ManyToOne(() => Brand, { cascade: true, onDelete: 'CASCADE' })
  brand: Brand;

  @OneToMany(() => Detail, (detail) => detail.model)
  detail: Detail[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
