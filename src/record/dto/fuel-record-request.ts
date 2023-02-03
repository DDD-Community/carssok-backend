import { Type } from 'class-transformer';
import { ValidateNested } from 'class-validator';
import { FuelType } from 'src/utils/type';

export class FuelRecordRequest {
  public eventedAt: Date;

  public fuelType: FuelType; //TODO ENUM type
  public amount: number;
  public price: number;
  public charge: number;
  public memo: string;
  public location: string;
  public carId: number;
}
