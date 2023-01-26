import { Brand } from 'src/crawler/entities/brand.entity';
import { Detail } from 'src/crawler/entities/detail.entity';
import { Model } from 'src/crawler/entities/model.entity';
import { Image } from 'src/image/entities/image.entity';
import { User } from 'src/user/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
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
  nickName: string;

  @ManyToOne(() => Brand, (brand) => brand.car, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  brand: Brand;

  @ManyToOne(() => Model, (model) => model.car, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  model: Model;

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

  @DeleteDateColumn()
  deletedAt: Date;
}
