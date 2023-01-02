import { Column, Entity } from "typeorm";
import { Record } from "./record.entity";

@Entity()
export class Accident extends Record {
    
    @Column()
    location: string

}