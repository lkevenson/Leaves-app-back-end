import { OmitType } from "@nestjs/mapped-types";
import { IsString } from "class-validator";
import { User } from "../schema/user.schema";

export class CreateUserDto extends OmitType(User, [
  "sign_in_count",
  "createdAt",
  "updatedAt",
]) {
  @IsString()
  confirmPassword?: string;
}
