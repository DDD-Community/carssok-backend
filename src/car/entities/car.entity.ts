import { Brand } from 'src/car/entities/brand.entity';
import { Image } from 'src/image/entities/image.entity';
import { Accident } from 'src/record/entities/accident.entity';
import { Fuel } from 'src/record/entities/fuel.entity';
import { Maintenance } from 'src/record/entities/maintenance.entity';
import { Run } from 'src/record/entities/run.entity';
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
import { Detail } from './detail.entity';
import { Model } from './model.entity';

@Entity()
export class Car {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nickName: string;

  @ManyToOne(() => Brand, (brand) => brand.car, {
    cascade: true,
    onDelete: 'CASCADE',
    lazy: true
  })
  brand: Brand;

  @ManyToOne(() => Model, (model) => model.car, {
    cascade: true,
    onDelete: 'CASCADE',
    lazy: true
  })
  model: Model;

  @ManyToOne(() => Detail, (detail) => detail.car, {
    cascade: true,
    onDelete: 'CASCADE',
    lazy: true
  })
  detail: Detail;

  @ManyToOne(() => User, (user) => user.car, {
    cascade: true,
    onDelete: 'CASCADE',
    lazy: true
  })
  user: User;

  @OneToMany(() => Image, (image) => image.car)
  image: Image[];

  @OneToMany(() => Fuel, (fuel) => fuel.car)
  fuel: Fuel[];

  @OneToMany(() => Accident, (accident) => accident.car)
  accident: Accident[];

  @OneToMany(() => Maintenance, (maintenance) => maintenance.car)
  maintenance: Maintenance[];

  @OneToMany(() => Run, (run) => run.car)
  run: Run[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;

  static createCarInfo(
    brand: Brand,
    model: Model,
    detail: Detail,
    nickName: string,
    user: User,
  ){
    const car = new Car();
    car.brand = brand;
    car.model = model;
    car.detail = detail;
    car.nickName = nickName;
    car.user = user;
    return car;
  }
}
