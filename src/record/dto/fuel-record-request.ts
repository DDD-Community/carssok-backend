export class FuelRecordRequest {
    public eventDate: Date
    public amount: number
    public fuelType: string //TODO ENUM type 
    public charge: number
    public memo: string
    public location: string
}