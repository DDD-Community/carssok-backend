import { User } from "src/user/entities/user.entity";
import { Column, CreateDateColumn, DeleteDateColumn, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

export abstract class Record {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  eventedAt: Date;

  @Column()
  memo: string;

  @DeleteDateColumn()
  deleteAt: Date

  @ManyToOne(() => User, { cascade: true })
  @JoinColumn({
      name: 'user_id',
      referencedColumnName: 'user_id',
  })
  user: User

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updateAt: Date;
}
