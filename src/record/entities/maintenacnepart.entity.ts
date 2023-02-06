import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { Maintenance } from "./maintenance.entity";

@Entity()
export class MaintenancePart {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    title: string

    @Column()
    charge: number

    @Column()
    distanceForBuy: number

    @ManyToOne(() => Maintenance)
    @JoinColumn({
        name: 'maintence_id',
        referencedColumnName: 'id'
    })
    maintenance: Maintenance;
    
}