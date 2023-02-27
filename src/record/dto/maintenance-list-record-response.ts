import { Maintenance } from '../entities/maintenance.entity';
import { MaintenancePartResponse } from './maintenance-record-response';

export class MaintenanceListRecordResponse {
  public id: number;
  public date: Date;
  public part: MaintenancePartResponse[];

  constructor(maintenance: Maintenance) {
    this.id = maintenance.id;
    this.date = maintenance.eventedAt;
    this.part = maintenance.maintenancePart.map(
      (it) => new MaintenancePartResponse(it),
    );
  }
}
