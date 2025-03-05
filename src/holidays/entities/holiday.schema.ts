import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { IsNumber, IsString } from "class-validator";
import { Document } from "mongoose";
import { BaseSchema } from "../../utils/base-entity";

export type HolidayDocument = Holiday & Document;

@Schema({ timestamps: true, collection: "Holidays" })
export class Holiday extends BaseSchema {
  @Prop({ type: String, required: true, index: true })
  @IsString()
  name: string;

  @Prop({ type: Number, required: true, maxlength: 2 })
  @IsNumber()
  day: number;

  @Prop({ type: String })
  @IsString()
  month: string;

  @Prop({ type: Number, minlength: 2, maxlength: 4 })
  @IsNumber()
  year: number;
}

export const HolidaySchema = SchemaFactory.createForClass(Holiday);
