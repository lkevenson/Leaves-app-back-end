import Leave from "./leave";

interface ILeaveBuilder {
  leave: Leave;
  setRefNumber(ref: string): this;
  setDateApplication(dateApplication: string): this;
  setEmployee(emp: string): this;
  setLeaveType(leaveT: string): this;
  setNumberOfDay(number_of_days: number): this;
  setStartDate(startDate: string): this;
  setEndDate(endDate: string): this;
  setJustification(justify: string): this;
  setRemark(remark: string): this;
  getResult(): Leave;
}

export class LeaveBuilder implements ILeaveBuilder {
  leave: Leave;

  constructor() {
    this.leave = new Leave();
  }

  setRefNumber(ref: string): this {
    this.leave.ref_number = ref;
    return this;
  }
  setDateApplication(): this {
    this.leave.date_of_application = new Date().toISOString();
    return this;
  }
  setEmployee(emp: string): this {
    this.leave.employee = emp;
    return this;
  }
  setLeaveType(leaveT: string): this {
    this.leave.leave_type = leaveT;
    return this;
  }
  setNumberOfDay(number_of_days: number): this {
    this.leave.number_of_days = number_of_days;
    return this;
  }
  setStartDate(startDate: string): this {
    this.leave.start_date = startDate;
    return this;
  }
  setEndDate(endDate: string): this {
    this.leave.end_date = endDate;
    return this;
  }
  setJustification(justify: string): this {
    this.leave.justify = justify;
    return this;
  }
  setRemark(remark: string): this {
    this.leave.remarks = remark;
    return this;
  }
  getResult(): Leave {
    return this.leave;
  }
}
