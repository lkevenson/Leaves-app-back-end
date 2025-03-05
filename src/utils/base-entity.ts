import { Prop } from "@nestjs/mongoose";
import { IsString } from "class-validator";

export abstract class BaseSchema {
  @IsString()
  @Prop({ type: String, required: false, default: new Date().toISOString() })
  createdAt?: string;

  @IsString()
  @Prop({ type: String, required: false, default: new Date().toISOString() })
  updatedAt?: string;
}
