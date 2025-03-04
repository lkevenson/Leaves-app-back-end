import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { differenceInYears } from "date-fns";
import { Model } from "mongoose";
import { EmployeeService } from "src/employee/employee.service";
import {
  Employee,
  StatusEmployee,
} from "src/employee/entities/employee.schema";
import { LeaveType } from "src/leave_type/entities/leave_type.schema";
import { LeaveTypeService } from "src/leave_type/leave_type.service";
import { BaseService } from "src/utils/base-services";
import { Response } from "src/utils/response";
import { CreateLeaveDto } from "./dto/create-leave.dto";
import { Leave } from "./entities/leave.schema";
import LeaveClient from "./model/leave-client";

@Injectable()
export class LeaveService extends BaseService<Leave> {
  constructor(
    @InjectModel(Leave.name) protected leaveModel: Model<Leave>,
    protected employeeService: EmployeeService,
    protected leaveTypeService: LeaveTypeService
  ) {
    super(leaveModel);
  }

  async create(data: CreateLeaveDto): Promise<Leave | Response<any>> {
    try {
      if (!data.employee || !data.leave_type) {
        throw new BadRequestException(
          "Employee or leave type are not specified"
        );
      }

      const empFind: Employee | any = await this.employeeService.findById(
        data.employee
      );

      if (
        (empFind && empFind.success === false) ||
        (empFind && empFind?.status === StatusEmployee.DISABLE)
      ) {
        throw new BadRequestException(
          "Employee does not exist. Please, contact your administrator."
        );
      }

      const leaveType: LeaveType | any = await this.leaveTypeService.findById(
        data.leave_type
      );
      if (leaveType && leaveType.success === false) {
        throw new BadRequestException("Leave type does not exist.");
      }
      if (
        leaveType.number_of_days > 0 &&
        data.number_of_days > leaveType.number_of_days
      ) {
        throw new BadRequestException(
          `You can not get ${data.number_of_days} for ${leaveType.name} leaves`
        );
      }

      if (differenceInYears(new Date(), new Date(empFind.Joining_date)) === 0) {
        throw new BadRequestException(
          "You are not eligible for such a request."
        );
      }

      const leaves_for_this_employee: Leave[] | any = await this.getByEmployee(
        data.employee.toString()
      );

      if (
        Array.isArray(leaves_for_this_employee) &&
        leaves_for_this_employee.length > 0
      ) {
        const sumOfLeaveDay = leaves_for_this_employee.reduce(
          (accumulator: number, currentValue: any) => {
            if (
              currentValue.leave_type._id.toString() ===
                data.leave_type.toString() &&
              currentValue.status !== "Rejected"
            ) {
              return accumulator + currentValue.leave_type.number_of_days;
            }
          },
          0
        );

        // Compare sumOfLeaveDay to the number of days for the leave type already taken
        if (
          sumOfLeaveDay === leaveType.number_of_days &&
          leaveType.number_of_days > 0
        ) {
          throw new BadRequestException(
            "you have accessed the number of days allowed"
          );
        }
      }

      const newRequest = new this.leaveModel(LeaveClient(data));

      await newRequest.save();

      return newRequest;
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  async findAll(): Promise<Leave[] | Response<any>> {
    try {
      const leaves = await this.leaveModel
        .find({}, { _v: 0 })
        .populate("employee")
        .populate("leave_type");

      if (leaves.length === 0) return [];

      return leaves;
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  async findById(id: string): Promise<Leave | Response<any>> {
    try {
      const leave = await this.leaveModel
        .findById({ _id: id }, { _v: 0 })
        .populate("employee")
        .populate("leave_type");

      if (!leave) throw new NotFoundException("Leave not found");

      return leave;
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  async findByStatus(status: string): Promise<Leave[] | Response<any>> {
    try {
      const leaves = await this.leaveModel
        .find({ status: new RegExp(status, "i") }, { _v: 0 })
        .populate("employee")
        .populate("leave_type");

      if (leaves.length === 0)
        throw new NotFoundException(`No ${status} leaves found.`);

      return leaves;
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  async getByLeaveType(leaveType: string): Promise<Leave[] | Response<any>> {
    try {
      const leaves = await this.leaveModel
        .find({ leave_type: leaveType }, { _v: 0 })
        .populate("employee")
        .populate("leave_type");

      if (leaves.length === 0)
        throw new NotFoundException(`No leaves found for this type.`);

      return leaves;
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  async getByEmployee(employee: string): Promise<Leave[] | Response<any>> {
    try {
      const leaves = await this.leaveModel
        .find({ employee }, { _v: 0 })
        .populate("employee")
        .populate("leave_type");

      if (leaves.length === 0)
        throw new NotFoundException(`No leave found for this employee.`);

      return leaves;
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  async changeStatus(
    id: string,
    status: string
  ): Promise<boolean | Response<any>> {
    try {
      const leaveFound = await this.findById(id);

      if (!leaveFound) throw new NotFoundException("Leave not found");
      await this.leaveModel
        .findByIdAndUpdate({ _id: id }, { status: status }, { new: true })
        .populate("employee")
        .populate("leave_type");
      return true;
    } catch (error) {
      return { success: false, error: error.message };
    }
  }
}
