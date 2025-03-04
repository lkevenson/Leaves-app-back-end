import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { IsString } from "class-validator";
import mongoose, { Document } from "mongoose";
import { Department } from "src/department/entities/department.schema";
import { BaseSchema } from "../../utils/base-entity";

export type EmployeeDocument = Employee & Document;

export enum EnumEmployee {
  MALE = "Male",
  FEMALE = "Female",
}

export enum StatusEmployee {
  ENABLE = "Enable",
  DISABLE = "Disable",
}

@Schema({ timestamps: true, collection: "employees" })
export class Employee extends BaseSchema {
  @Prop({ type: String, required: true })
  @IsString()
  last_name: string;

  @Prop({ type: String, required: true })
  @IsString()
  first_name: string;

  @Prop({ enum: EnumEmployee, required: true, default: EnumEmployee.MALE })
  @IsString()
  gender: EnumEmployee;

  @Prop({
    type: String,
    minlength: 10,
    maxlength: 10,
    required: true,
    unique: true,
  })
  @IsString()
  pid: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: Department.name })
  @IsString()
  department_id: Department;

  @Prop({ type: String })
  @IsString()
  Joining_date: string;

  @Prop({ enum: StatusEmployee, default: StatusEmployee.ENABLE })
  @IsString()
  status: StatusEmployee;
}

export const EmployeeSchema = SchemaFactory.createForClass(Employee);
