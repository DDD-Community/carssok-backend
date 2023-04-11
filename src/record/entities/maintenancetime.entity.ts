import { Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { MaintenancePart } from "./maintenacnepart.entity";
import { Car } from "src/car/entities/car.entity";

@Entity()
export class MaintenanceTime {

    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => MaintenancePart)
    @JoinColumn({referencedColumnName: 'id'})
    maintenancePart: MaintenancePart;

    @ManyToOne(()=> Car)
    @JoinColumn({referencedColumnName: 'id'})
    car: Car;
}