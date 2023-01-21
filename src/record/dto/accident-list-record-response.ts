import { Accident } from "../entities/accident.entity"

export class AccidentListResponse {
    
    public id: number
    public location: string
    
    constructor(accient: Accident) {
        this.id = accient.id
        this.location = accient.location
    }
}