import Leave from "./leave";
import { LeaveBuilder } from "./leave-builder";

export default class Director {
  static construct(request: any): Leave {
    return new LeaveBuilder()
      .setRefNumber(request.ref_number)
      .setDateApplication()
      .setEmployee(request.employee)
      .setLeaveType(request.leave_type)
      .setNumberOfDay(request.number_of_days)
      .setStartDate(request.start_date)
      .setEndDate(request.end_date)
      .setJustification(request.justify)
      .setRemark(request.remarks)
      .getResult();
  }
}
