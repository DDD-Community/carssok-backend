import { Detail } from 'src/crawler/entities/detail.entity';
import { Image } from 'src/image/entities/image.entity';
import { User } from 'src/user/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Car {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  plateNumber: string;

  @Column()
  nickName: string;

  @ManyToOne(() => Detail, (detail) => detail.car, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  detail: Detail;

  @ManyToOne(() => User, (user) => user.car, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  user: User;

  @OneToMany(() => Image, (image) => image.car)
  image: Image[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
