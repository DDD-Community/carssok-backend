import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { User } from './user.entity';

@Entity()
export class UserCar {
  @PrimaryGeneratedColumn()
  user_car_id: number;

  @Column()
  plateNumber: string;

  @Column()
  nickname: string;

  @ManyToOne(()=>User)
  @JoinColumn({
    name: 'user_id',
    referencedColumnName: 'user_id'
  })
  user: User;
}