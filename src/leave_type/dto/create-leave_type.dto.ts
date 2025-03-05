import { OmitType } from "@nestjs/mapped-types";
import { LeaveType } from "../entities/leave_type.schema";

export class CreateLeaveTypeDto extends OmitType(LeaveType, [
  "createdAt",
  "updatedAt",
]) {}
