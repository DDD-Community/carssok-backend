import { Column, Entity, ManyToOne } from 'typeorm';
import { Record } from './record.entity';
import { Car } from 'src/car/entities/car.entity';

@Entity()
export class Fuel extends Record {
  @Column()
  location: string;

  @Column()
  amount: number;

  @Column()
  fuelType: string;

  @Column()
  charge: number;

  @Column()
  price: number;

  @ManyToOne(() => Car, (car) => car.fuel, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  car: Car;
}
