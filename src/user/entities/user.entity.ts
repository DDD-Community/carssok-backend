import { Car } from 'src/car/entities/car.entity';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  user_id: number;

  @OneToMany(() => Car, (car) => car.user, { nullable: true })
  car: Car[];
}
