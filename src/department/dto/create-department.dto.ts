import { OmitType } from "@nestjs/mapped-types";
import { Department } from "../entities/department.schema";

export class CreateDepartmentDto extends OmitType(Department, [
  "createdAt",
  "updatedAt",
]) {}
