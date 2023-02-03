import { Column, Entity, ManyToOne } from 'typeorm';
import { Record } from './record.entity';
import { Car } from 'src/car/entities/car.entity';

@Entity()
export class Accident extends Record {
  @Column()
  location: string;

  @ManyToOne(() => Car, (car) => car.accident, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  car: Car;
}
