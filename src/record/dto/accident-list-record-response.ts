import { Accident } from '../entities/accident.entity';

export class AccidentListResponse {
  public id: number;
  public location: string;
  public eventedAt: Date;
  constructor(accient: Accident) {
    this.id = accient.id;
    this.location = accient.location;
    this.eventedAt = accient.eventedAt;
  }
}
