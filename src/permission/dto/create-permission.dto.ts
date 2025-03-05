import { OmitType } from "@nestjs/mapped-types";
import { Permission } from "../entities/permission.schema";

export class CreatePermissionDto extends OmitType(Permission, [
  "createdAt",
  "updatedAt",
]) {}
