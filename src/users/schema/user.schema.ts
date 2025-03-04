import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { IsBoolean, IsEmail, IsNumber, IsString } from "class-validator";
import mongoose, { HydratedDocument } from "mongoose";
import { Role } from "src/roles/entities/role.schema";
import { BaseSchema } from "../../utils/base-entity";
// import { Role } from './role.enum';

export type UserDocument = HydratedDocument<User>;

@Schema({ timestamps: true, collection: "users" })
export class User extends BaseSchema {
  @Prop({ type: String, required: true, index: true, unique: true })
  @IsString()
  @IsEmail()
  email: string;

  @Prop({ type: String, required: true, index: true, unique: true })
  @IsString()
  username: string;

  @Prop({ required: true })
  @IsString()
  password: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: Role.name })
  @IsString()
  role_id: Role;

  @Prop({ default: 0 })
  @IsNumber()
  sign_in_count: number;

  @Prop({ required: false, default: 0 })
  @IsBoolean()
  deleted?: boolean;
}

export const UserSchema = SchemaFactory.createForClass(User);
