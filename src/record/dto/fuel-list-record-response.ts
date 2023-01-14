import { Fuel } from "../entities/fuel.entity"

export class FuelRecordListResponse {
    private id: number
    private date: Date
    private location: string
    private price: number

    constructor(fuel: Fuel) {
        this.id = fuel.id
        this.date = fuel.eventedAt
        this.location = fuel.location
        this.price = fuel.price
    }
}