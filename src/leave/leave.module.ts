import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { EmployeeModule } from "src/employee/employee.module";
import { LeaveTypeModule } from "../leave_type/leave_type.module";
import { Leave, LeaveSchema } from "./entities/leave.schema";
import { LeaveController } from "./leave.controller";
import { LeaveService } from "./leave.service";

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Leave.name, schema: LeaveSchema }]),
    EmployeeModule,
    LeaveTypeModule,
  ],
  controllers: [LeaveController],
  providers: [LeaveService],
})
export class LeaveModule {}
