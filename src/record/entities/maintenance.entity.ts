import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { Record } from './record.entity';
import { Car } from 'src/car/entities/car.entity';
import { MaintenancePart } from './maintenacnepart.entity';

@Entity()
export class Maintenance extends Record {
  @Column()
  location: string;

  @Column()
  charge: number;

  @OneToMany(() => MaintenancePart, (part) => part.maintenance, {cascade: true, onDelete: "CASCADE"})
  maintenancePart: MaintenancePart[]

  @ManyToOne(() => Car, (car) => car.maintenance, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  car: Car;
}
