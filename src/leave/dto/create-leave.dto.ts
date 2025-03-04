import { OmitType } from "@nestjs/mapped-types";
import { Leave } from "../entities/leave.schema";

export class CreateLeaveDto extends OmitType(Leave, [
  "createdAt",
  "updatedAt",
  "attachment",
  "end_date",
  "ref_number",
  "date_of_application",
  "remarks",
  "status",
]) {}
