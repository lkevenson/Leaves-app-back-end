import { Exclude, Expose } from "class-transformer";
import { Role } from "../schema/role.enum";

export class UserDto {
  @Expose()
  _id: any;
  email: string;
  username: string;
  role: Role;
  sign_in_count: number;
  deleted: boolean;

  @Exclude()
  password: string;

  constructor(partial: Partial<UserDto>) {
    Object.assign(this, partial);
  }
}
