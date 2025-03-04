import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { BaseService } from "src/utils/base-services";
import { Response } from "src/utils/response";
import { Employee, StatusEmployee } from "./entities/employee.schema";

@Injectable()
export class EmployeeService extends BaseService<Employee> {
  constructor(
    @InjectModel(Employee.name) protected employeeModel: Model<Employee>
  ) {
    super(employeeModel);
  }

  async findAll(): Promise<Employee[] | Response<any>> {
    try {
      const allEmployee = await this.employeeModel
        .find({})
        .populate("department_id");

      if (allEmployee.length === 0) {
        throw new NotFoundException("No employee found.");
      }

      return allEmployee;
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  async findById(id: any): Promise<Employee | Response<any>> {
    try {
      const employee = await this.employeeModel
        .findOne({ _id: id })
        .populate("department_id");

      if (!employee) {
        throw new NotFoundException("Employee not found");
      }

      return employee;
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  async getByDepartmentId(
    departmentId: string
  ): Promise<Employee[] | Response<any>> {
    try {
      const employeeByDepartment = await this.employeeModel
        .find({
          department_id: departmentId,
        })
        .populate("department_id");

      if (employeeByDepartment.length === 0) {
        throw new NotFoundException("No employee found.");
      }

      return employeeByDepartment;
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  async getByStatus(status: string): Promise<Employee[] | Response<any>> {
    try {
      const employeeByStatus = await this.employeeModel
        .find({
          status,
        })
        .populate("department_id");

      if (employeeByStatus.length === 0) {
        throw new NotFoundException("No employee found.");
      }

      return employeeByStatus;
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  async changeStatus(id: string): Promise<boolean | Response<any>> {
    try {
      const emp = await this.employeeModel.findById(id);

      if (!emp) throw new BadRequestException("Employee does not exist");

      await this.employeeModel.findByIdAndUpdate(
        {
          _id: id,
        },
        {
          status:
            emp.status.toLowerCase() === StatusEmployee.ENABLE.toLowerCase()
              ? StatusEmployee.DISABLE
              : StatusEmployee.ENABLE,
        },
        { new: true }
      );

      return true;
    } catch (error) {
      return { success: false, error: error.message };
    }
  }
}
