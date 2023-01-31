import { ValidateNested } from "class-validator"
import { MaintenancePart } from "../entities/maintenacnepart.entity"

export class MaintenanceRecordRequest {
    public eventDate: Date
    public location: string
    public memo: string
    public parts: MaintenacnePartRequest[]
}

export class MaintenacnePartRequest {

    public name: string
    public charge: number

    constructor(part: MaintenancePart){
        this.name = part.title
        this.charge = part.charge
    }

}