import { OmitType } from "@nestjs/mapped-types";
import { Holiday } from "../entities/holiday.schema";

export class CreateHolidayDto extends OmitType(Holiday, [
  "createdAt",
  "updatedAt",
]) {}
