import { Car } from 'src/car/entities/car.entity';
import { Accident } from 'src/record/entities/accident.entity';
import { Fuel } from 'src/record/entities/fuel.entity';
import { Maintenance } from 'src/record/entities/maintenance.entity';
import { Run } from 'src/record/entities/run.entity';

import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Image {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  image: string;

  @ManyToOne(() => Car, (car) => car.image, {
    nullable: true,
    cascade: true,
    onDelete: 'CASCADE',
  })
  car: Car;

  @ManyToOne(() => Fuel, (fuel) => fuel.image, {
    nullable: true,
    cascade: true,
    onDelete: 'CASCADE',
  })
  fuel: Fuel;

  @ManyToOne(() => Accident, (accident) => accident.image, {
    nullable: true,
    cascade: true,
    onDelete: 'CASCADE',
  })
  accident: Accident;

  @ManyToOne(() => Maintenance, (maintenance) => maintenance.image, {
    nullable: true,
    cascade: true,
    onDelete: 'CASCADE',
  })
  maintenance: Maintenance;

  @ManyToOne(() => Run, (run) => run.image, {
    nullable: true,
    cascade: true,
    onDelete: 'CASCADE',
  })
  run: Run;
}
