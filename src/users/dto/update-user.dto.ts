import { IsString } from "class-validator";

export class UpdateUserDto {
  @IsString()
  newPassword: string;

  @IsString()
  confirmPassword: string;

  @IsString()
  oldPassword: string;
}
