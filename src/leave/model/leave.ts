export default class Leave {
  ref_number = ""; // ref-1235,
  date_of_application = ""; // 25-07-2023,
  employee = ""; // 648a0c34a1fa00cb5427f2c6,
  leave_type = ""; // 64887f99596ec03f00279382,
  number_of_days = 0; //
  start_date = ""; // 25-07-2023,
  end_date = ""; //11-08-2023,
  justify = ""; //Lorem Ipsum dolr sit ...
  remarks = ""; //Lorem Ipsum dolr sit ...

  construction(): any {
    return {
      ref_number: this.ref_number,
      date_of_application: this.date_of_application,
      employee: this.employee,
      leave_type: this.leave_type,
      number_of_days: this.number_of_days,
      start_date: this.start_date,
      end_date: this.end_date,
      justify: this.justify,
      remarks: this.remarks,
    };
  }
}
