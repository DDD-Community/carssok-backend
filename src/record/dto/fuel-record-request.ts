export class FuelRecordRequest {
    public eventDate: Date
    public fuelType: string //TODO ENUM type 
    public amount: number
    public price: number
    public charge: number
    public memo: string
    public location: string
}