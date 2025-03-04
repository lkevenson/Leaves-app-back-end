import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { LeaveType, LeaveTypeSchema } from "./entities/leave_type.schema";
import { LeaveTypeController } from "./leave_type.controller";
import { LeaveTypeService } from "./leave_type.service";

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: LeaveType.name, schema: LeaveTypeSchema },
    ]),
  ],
  controllers: [LeaveTypeController],
  providers: [LeaveTypeService],
  exports: [LeaveTypeService],
})
export class LeaveTypeModule {}
