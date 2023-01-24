import { Column, Entity, OneToMany } from 'typeorm';
import { Record } from './record.entity';
import { Image } from 'src/image/entities/image.entity';

@Entity()
export class Run extends Record {
  @Column()
  distance: number;

  @OneToMany(() => Image, (image) => image.run)
  image: Image[];
}
