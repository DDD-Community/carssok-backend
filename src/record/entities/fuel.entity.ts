import { Column, Entity, OneToMany } from 'typeorm';
import { Record } from './record.entity';
import { Image } from 'src/image/entities/image.entity';

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

  @OneToMany(() => Image, (image) => image.fuel)
  image: Image[];
}
