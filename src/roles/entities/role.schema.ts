import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Type } from "class-transformer";
import { IsString } from "class-validator";
import mongoose, { HydratedDocument } from "mongoose";
import { Permission } from "src/permission/entities/permission.schema";
import { BaseSchema } from "../../utils/base-entity";

export type RoleDocument = HydratedDocument<Role>;

@Schema({ timestamps: true, collection: "roles" })
export class Role extends BaseSchema {
  @Prop({ type: String, required: true, index: true, unique: true })
  @IsString()
  name: string;

  @Prop({ type: String, required: true, index: true, unique: true })
  @IsString()
  slug: string;

  @Prop({
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: Permission.name }],
  })
  @Type(() => Permission)
  role_permissions: Permission[];
}

export const RoleSchema = SchemaFactory.createForClass(Role);
