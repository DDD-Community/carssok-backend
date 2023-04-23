import { Transform } from 'class-transformer';
import { IsArray, IsNumber, IsOptional, IsString } from 'class-validator';

export class MaintenanceRecordRequest {
  
  public eventedAt: Date;
  @IsString()
  public location: string;
  @IsString()
  public memo: string;
  @Transform(({value}) => JSON.parse(value))
  @IsArray()
  @IsOptional()
  public parts: any;
  @IsNumber()
  public distance: number;

}
