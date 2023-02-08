import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export abstract class Record {
  @PrimaryGeneratedColumn()
  id: number;

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
}
