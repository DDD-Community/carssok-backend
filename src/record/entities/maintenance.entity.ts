import { Column, Entity, OneToMany } from "typeorm";
import { MaintenancePart } from "./maintenacnepart.entity";
import { Record } from "./record.entity";

@Entity()
export class Maintenance extends Record {
    
    @Column()
    location: string

    @OneToMany(() => MaintenancePart, (part) => part.maintenance, {cascade: true, onDelete: "CASCADE"})
    maintenancePart: MaintenancePart[]

}