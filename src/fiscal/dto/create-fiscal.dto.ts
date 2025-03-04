import { OmitType } from "@nestjs/mapped-types";
import { FiscalYear } from "../entities/fiscal.schema";

export class CreateFiscalDto extends OmitType(FiscalYear, [
  "createdAt",
  "updatedAt",
  "status",
]) {}
