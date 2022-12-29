import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from './user.entity';

@Entity('device')
export class Device {
  @PrimaryGeneratedColumn()
  device_id: number;

  @Column()
  device_token: string;

  @ManyToOne(() => User, { lazy: true })
  @JoinColumn({
    name: 'user_id',
    referencedColumnName: 'user_id',
  })
  user: User;
}
