import { MaintenancePart } from "../entities/maintenacnepart.entity"
import { Maintenance } from "../entities/maintenance.entity"

export class MaintenanceRecordResponse {
    public id: number
    public date: Date
    public location: string
    public memo: string
    public urls: string[]
    public parts: MaintenancePartResponse[]

    constructor(maintenance: Maintenance) {
        this.id = maintenance.id;
        this.date = maintenance.eventedAt;
        this.location = maintenance.location;
        this.memo = maintenance.memo;
        this.parts = maintenance.maintenancePart.map(it => new MaintenancePartResponse(it))
    }

}

export class MaintenancePartResponse {

    public partId: number
    public title: string
    public charge: number

    constructor(part: MaintenancePart) {
        this.partId = part.id;
        this.charge = part.charge;
        this.title = part.title;
    }

}