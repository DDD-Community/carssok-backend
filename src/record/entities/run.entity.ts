import { Column, Entity, ManyToOne } from 'typeorm';
import { Record } from './record.entity';
import { Car } from 'src/car/entities/car.entity';
@Entity()
export class Run extends Record {
  @Column()
  distance: number;

  @ManyToOne(() => Car, (car) => car.run, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  car: Car;
}
