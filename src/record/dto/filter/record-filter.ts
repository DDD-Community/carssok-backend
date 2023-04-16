import moment from "moment";
import { BaseRecordFilter } from "./base-filter";

export class RecordFilter extends BaseRecordFilter {

    getOneMonthRange(){
        const start = this.transfromKst(moment(this.date).startOf('month'));
        const end = this.transfromKst(moment(this.date).add(1, 'M').startOf('month'));
        return [start, end];
    }
}