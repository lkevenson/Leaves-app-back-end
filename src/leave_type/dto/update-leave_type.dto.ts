import { PartialType } from "@nestjs/mapped-types";
import { CreateLeaveTypeDto } from "./create-leave_type.dto";

export class UpdateLeaveTypeDto extends PartialType(CreateLeaveTypeDto) {}
