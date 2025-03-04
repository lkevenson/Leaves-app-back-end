import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { BaseService } from "../utils/base-services";
import { LeaveType } from "./entities/leave_type.schema";

@Injectable()
export class LeaveTypeService extends BaseService<LeaveType> {
  constructor(
    @InjectModel(LeaveType.name) protected leaveTypeModel: Model<LeaveType>
  ) {
    super(leaveTypeModel);
  }
}
