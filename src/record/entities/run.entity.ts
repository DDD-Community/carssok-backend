import { Column, Entity } from "typeorm";
import { Record } from "./record.entity";

@Entity()
export class Run extends Record {
    
    @Column()
    distance: number

}