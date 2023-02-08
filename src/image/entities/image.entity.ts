import { Car } from 'src/car/entities/car.entity';

import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Image {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  image: string;

  @Column()
  recordType: string;

  @Column()
  pkInfo: number;

  @ManyToOne(() => Car, (car) => car.image, {
    nullable: true,
    cascade: true,
    onDelete: 'CASCADE',
  })
  car: Car;
}
