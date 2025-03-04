import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { BaseService } from "../utils/base-services";
import { Department } from "./entities/department.schema";

@Injectable()
export class DepartmentService extends BaseService<Department> {
  constructor(
    @InjectModel(Department.name)
    protected readonly departmentModel: Model<Department>
  ) {
    super(departmentModel);
  }
}
