import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Maintenance } from './maintenance.entity';

@Entity()
export class MaintenancePart {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  charge: number;

  @Column()
  distanceForBuy: number;

  @ManyToOne(() => Maintenance, (maintenance) => maintenance.maintenancePart, {
    cascade: ['insert', 'update']
  })
  maintenance: Maintenance;
}
