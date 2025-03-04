import { OmitType } from "@nestjs/swagger";
import { Setting } from "../entities/setting.schema";

export class CreateSettingDto extends OmitType(Setting, [
  "logo",
  "second_logo",
  "createdAt",
  "updatedAt",
]) {}
