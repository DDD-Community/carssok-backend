import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Brand } from './brand.entity';
import { Detail } from './detail.entity';

@Entity()
export class Model {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ nullable: true })
  title: string;

  @Column({ nullable: true })
  thumb: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => Brand, (brand) => brand.model, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  brand: Brand;

  @OneToMany(() => Detail, (detail) => detail.model)
  detail: Detail[];
}
