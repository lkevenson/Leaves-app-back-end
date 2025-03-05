import { Exclude, Expose } from "class-transformer";
import { Type } from "../entities/type.enum";

export class SettingDto {
  @Expose()
  _id: any;
  name: string;
  sigle: string;
  enterprise_type: Type;
  description: string;
  slogan: string;
  address: string;
  tel: string;

  @Exclude()
  logo: string;
  second_logo: string;

  constructor(partial: Partial<SettingDto>) {
    Object.assign(this, partial);
  }
}
