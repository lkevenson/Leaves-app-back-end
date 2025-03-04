import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { IsString } from "class-validator";
import { HydratedDocument } from "mongoose";
import { BaseSchema } from "src/utils/base-entity";
import { Type } from "./type.enum";

export type SettingDocument = HydratedDocument<Setting>;

@Schema({ timestamps: true, collection: "settings" })
export class Setting extends BaseSchema {
  @Prop({ type: String, required: true, index: true, unique: true })
  @IsString()
  name: string;

  @Prop({ type: String, index: true, unique: true })
  @IsString()
  sigle: string;

  @Prop({ type: String })
  @IsString()
  description: string;

  @Prop({ enum: Type, required: true, default: Type.PUBLIC })
  @IsString()
  enterprise_type: Type;

  @Prop({ type: String })
  @IsString()
  slogan: string;

  @Prop({ type: String })
  @IsString()
  address: string;

  @Prop({ type: String })
  @IsString()
  tel: string;

  @Prop({ type: String, default: "" })
  @IsString()
  logo: string;

  @Prop({ type: String, default: "" })
  @IsString()
  second_logo: string;
}

export const SettingSchema = SchemaFactory.createForClass(Setting);
