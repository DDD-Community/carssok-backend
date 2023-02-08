import { Run } from '../entities/run.entity';

export class RunRecordResponse {
  private id: number;
  private date: Date;
  private distance: number;

  constructor(run: Run) {
    this.id = run.id;
    this.date = run.eventedAt;
    this.distance = run.distance;
  }
}
