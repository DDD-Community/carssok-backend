import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { Maintenance } from './maintenance.entity';

@Entity()
export class MaintenancePart {
  @PrimaryColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  charge: number;

  @Column()
  distanceForBuy: number;

  @ManyToOne(() => Maintenance, (maintenance) => maintenance.maintenancePart, {
    onDelete: 'CASCADE',
    cascade: true,
  })
  @JoinColumn({
    name: 'maintence_id',
    referencedColumnName: 'id',
  })
  maintenance: Maintenance;
}
