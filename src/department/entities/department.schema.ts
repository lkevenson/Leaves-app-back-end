import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Type } from "class-transformer";
import { IsString } from "class-validator";
import * as mongoose from "mongoose";
import { HydratedDocument } from "mongoose";
import { Setting } from "src/settings/entities/setting.schema";
import { BaseSchema } from "src/utils/base-entity";

export type DepartmentDocument = HydratedDocument<Department>;

@Schema({ timestamps: true, collection: "departments" })
export class Department extends BaseSchema {
  @Prop({ type: String, required: true, index: true, unique: true })
  @IsString()
  name: string;

  @Prop({ type: String })
  @IsString()
  description: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: Setting.name })
  @Type(() => Setting)
  company: Setting;
}

export const DepartmentSchema = SchemaFactory.createForClass(Department);
