import { addBusinessDays } from "date-fns";
import Leave from "./leave";
import Director from "./leave-director";

const randomInt = () => Math.random().toString(36).slice(-6);

const LeaveClient = (request: any): Leave | any => {
  const ref_number = `ref-${randomInt()}`;

  const result: any = addBusinessDays(
    new Date(request.start_date),
    request.number_of_days
  );

  return Director.construct({
    ref_number: ref_number,
    start_date: new Date(request.start_date).toISOString(),
    end_date: result.toISOString(),
    employee: request.employee,
    leave_type: request.leave_type,
    number_of_days: request.number_of_days,
    justify: request.justify,
    remarks: "",
  });
};

export default LeaveClient;
