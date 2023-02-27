import { IsArray, ValidateNested } from 'class-validator';
import { MaintenancePart } from '../entities/maintenacnepart.entity';

export class MaintenanceRecordRequest {
    public eventDate: Date
    public location: string
    public memo: string
    @ValidateNested()
    public parts: MaintenacnePartRequest[]
}

export class MaintenacnePartRequest {
  public name: string;
  public charge: number;
}
