import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";
import { MaintenacnePartRequest } from "../dto/maintenance-record-request";
import { Maintenance } from "./maintenance.entity";

@Entity()
export class MaintenancePart {

    @PrimaryColumn()
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