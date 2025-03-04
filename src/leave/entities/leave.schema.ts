import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Type } from "class-transformer";
import { IsEnum, IsNumber, IsString } from "class-validator";
import mongoose, { Document } from "mongoose";
import { Employee } from "src/employee/entities/employee.schema";
import { LeaveType } from "../../leave_type/entities/leave_type.schema";
import { BaseSchema } from "../../utils/base-entity";

export enum EnumLeaveType {
  PENDING = "Pending",
  APPROVED = "Approved",
  REJECTED = "Rejected",
}

export type LeaveDocument = Leave & Document;

@Schema({ timestamps: true, collection: "leaves" })
export class Leave extends BaseSchema {
  @Prop({ type: String, required: true, index: true, unique: true })
  @IsString()
  ref_number: string;

  @Prop({ type: String, required: true })
  @IsString()
  date_of_application: string;

  @Prop({ type: Number, required: true })
  @IsNumber()
  number_of_days: number;

  @Prop({ type: String })
  @IsString()
  attachment: string;

  @Prop({
    required: true,
    type: mongoose.Schema.Types.ObjectId,
    ref: Employee.name,
  })
  @Type(() => Employee)
  @IsString()
  employee: Employee;

  @Prop({
    required: true,
    type: mongoose.Schema.Types.ObjectId,
    ref: LeaveType.name,
  })
  @Type(() => LeaveType)
  @IsString()
  leave_type: LeaveType;

  @Prop({ type: String })
  @IsString()
  start_date: string;

  @Prop({ type: String })
  @IsString()
  end_date: string;

  @Prop({ enum: EnumLeaveType, default: EnumLeaveType.PENDING })
  @IsEnum(() => EnumLeaveType)
  status: EnumLeaveType;

  @Prop({ type: String })
  @IsString()
  justify: string;

  @Prop({ type: String })
  @IsString()
  remarks: string;
}

export const LeaveSchema = SchemaFactory.createForClass(Leave);
