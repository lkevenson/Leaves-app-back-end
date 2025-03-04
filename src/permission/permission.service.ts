import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { BaseService } from "src/utils/base-services";
import { Permission } from "./entities/permission.schema";

@Injectable()
export class PermissionService extends BaseService<Permission> {
  constructor(
    @InjectModel(Permission.name)
    protected readonly permissionModel: Model<Permission>
  ) {
    super(permissionModel);
  }
}
