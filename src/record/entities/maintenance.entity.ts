import { Column, Entity } from "typeorm";
import { Record } from "./record.entity";

@Entity()
export class Maintenance extends Record {
    
    @Column()
    location: string

    @Column()
    parts: string

    @Column()
    charge: number

}