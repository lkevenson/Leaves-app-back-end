import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { IsNumber, IsString } from "class-validator";
import { Document } from "mongoose";
import { BaseSchema } from "../../utils/base-entity";

export type LeaveTypeDocument = LeaveType & Document;

@Schema({ timestamps: true, collection: "leaveTypes" })
export class LeaveType extends BaseSchema {
  @Prop({ type: String, required: true, index: true, unique: true })
  @IsString()
  name: string;

  @Prop({ type: String })
  @IsString()
  description: string;

  @Prop({
    type: Number,
  })
  @IsNumber()
  number_of_days: number;
}

export const LeaveTypeSchema = SchemaFactory.createForClass(LeaveType);
