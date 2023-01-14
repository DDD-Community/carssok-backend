import { Column, Entity } from "typeorm";
import { Record } from "./record.entity";

@Entity()
export class Fuel extends Record {
    
    @Column()
    location: string

    @Column()
    amount: number

    @Column()
    fuelType: string

    @Column()
    charge: number

    @Column()
    price: number

}