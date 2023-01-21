import { Accident } from "../entities/accident.entity"

export class AccidentRecordResponse {
    public eventDate: Date
    public memo: string
    public location: string
    public urls: string[]
    
    constructor(accdient: Accident) {
        this.eventDate = accdient.eventedAt;
        this.location = accdient.location;
        this.memo = accdient.memo;
    }
}