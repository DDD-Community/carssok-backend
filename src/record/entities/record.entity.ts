import { User } from 'src/user/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export abstract class Record {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  recordType: string;

  @Column()
  isDeleteAt: boolean;

  @Column()
  eventedAt: Date;

  @Column()
  memo: string;

  @DeleteDateColumn()
  deleteAt: Date;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updateAt: Date;

  @ManyToOne(() => User, { lazy: true })
  @JoinColumn({
    name: 'user_id',
    referencedColumnName: 'user_id',
  })
  user: User;
}
