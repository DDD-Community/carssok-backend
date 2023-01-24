import { Column, Entity, OneToMany } from 'typeorm';
import { Record } from './record.entity';
import { Image } from 'src/image/entities/image.entity';

@Entity()
export class Accident extends Record {
  @Column()
  location: string;

  @OneToMany(() => Image, (image) => image.accident)
  image: Image[];
}
