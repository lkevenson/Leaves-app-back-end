import { OmitType } from "@nestjs/mapped-types";
import { Employee } from "../entities/employee.schema";

export class CreateEmployeeDto extends OmitType(Employee, [
  "createdAt",
  "updatedAt",
  "status",
]) {}
