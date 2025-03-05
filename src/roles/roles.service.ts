import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { BaseService } from "src/utils/base-services";
import { Response } from "src/utils/response";
import { Role } from "./entities/role.schema";

@Injectable()
export class RolesService extends BaseService<Role> {
  constructor(
    @InjectModel(Role.name) protected readonly roleModel: Model<Role>
  ) {
    super(roleModel);
  }

  async findAll(): Promise<Role[] | Response<any>> {
    try {
      return this.roleModel.find({}, { _v: 0 }).populate("role_permissions");
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  async findById(id: string): Promise<Role | Response<any>> {
    try {
      return this.roleModel.findById(id).populate("role_permissions");
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  async remove(id: string): Promise<any> {
    try {
      // const roleFind = this.findById(id);
      // cont userByRole =
      // return roleFind;
      // Todo: Delete role if is not using by another object
      await this.roleModel.deleteOne({ _id: id });
      return { success: true, error: false };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }
}
