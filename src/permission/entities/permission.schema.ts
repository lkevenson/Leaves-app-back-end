import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { IsString } from "class-validator";
import { HydratedDocument } from "mongoose";
import { BaseSchema } from "../../utils/base-entity";

export type PermissionDocument = HydratedDocument<Permission>;

@Schema({ timestamps: true, collection: "permissions" })
export class Permission extends BaseSchema {
  @Prop({ type: String, required: true, unique: true })
  @IsString()
  name: string;
}

export const PermissionSchema = SchemaFactory.createForClass(Permission);
