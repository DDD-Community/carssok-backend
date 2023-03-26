import { IsNumber, IsString } from 'class-validator';

export class MaintenanceRecordRequest {
  
  public eventedAt: Date;
  @IsString()
  public location: string;
  @IsString()
  public memo: string;
  public parts: any;
  @IsNumber()
  public distance: number;

}
