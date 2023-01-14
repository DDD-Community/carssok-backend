import { Fuel } from "../entities/fuel.entity"

export class FuelRecordResponse {
    private date: Date
    private location: string
    private amount: number
    private charge: number
    private price: number
    private memo: string

    constructor(fuel: Fuel) {
        this.date = fuel.eventedAt
        this.location = fuel.location
        this.price = fuel.price
        this.charge = fuel.charge
        this.amount = fuel.amount
        this.memo = fuel.memo
    }
}