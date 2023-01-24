import { Column, Entity, OneToMany } from 'typeorm';
import { Record } from './record.entity';
import { Image } from 'src/image/entities/image.entity';

@Entity()
export class Maintenance extends Record {
  @Column()
  location: string;

  @Column()
  parts: string;

  @Column()
  charge: number;

  @OneToMany(() => Image, (image) => image.maintenance)
  image: Image[];
}
