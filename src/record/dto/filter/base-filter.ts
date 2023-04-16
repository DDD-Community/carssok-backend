import { Transform } from "class-transformer";
import { IsDate, IsOptional } from "class-validator";
import moment, { Moment } from "moment";

export abstract class BaseRecordFilter {

  @Transform(({value}) => moment(value).toDate())
  @IsDate()
  @IsOptional()
  public date: Date;

  transfromKst(moment: Moment): Date{
    return moment.add(9, 'h').toDate();
  }
}
