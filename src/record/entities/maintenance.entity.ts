import { Column, Entity, ManyToOne } from 'typeorm';
import { Record } from './record.entity';
import { Car } from 'src/car/entities/car.entity';

@Entity()
export class Maintenance extends Record {
  @Column()
  location: string;

  @Column()
  parts: string;

  @Column()
  charge: number;

  @ManyToOne(() => Car, (car) => car.maintenance, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  car: Car;
}
