import { Test, TestingModule } from "@nestjs/testing";
import { NotFoundException } from "@nestjs/common";
import { EmployeeController } from "../employee.controller";
import { EmployeeService } from "../employee.service";
import { CreateEmployeeDto } from "../dto/create-employee.dto";
import { UpdateEmployeeDto } from "../dto/update-employee.dto";
import mongoose from "mongoose";
import { Employee, EnumEmployee, StatusEmployee } from "../entities/employee.schema";
import { Department } from "../../department/entities/department.schema";

describe("EmployeeController", () => {
  let employeeController: EmployeeController;
  let employeeService: EmployeeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EmployeeController],
      providers: [
        {
          provide: EmployeeService,
          useValue: {
            create: jest.fn(),
            findAll: jest.fn(),
            findById: jest.fn(),
            getByStatus: jest.fn(),
            changeStatus: jest.fn(),
            getByDepartmentId: jest.fn(),
            update: jest.fn(),
            remove: jest.fn(),
          },
        },
      ],
    }).compile();

    employeeController = module.get<EmployeeController>(EmployeeController);
    employeeService = module.get<EmployeeService>(EmployeeService);
  });

  it("should be defined", () => {
    expect(employeeController).toBeDefined();
  });

  describe("create", () => {
    it("should call employeeService.create with the correct data", async () => {
      const department = new mongoose.Types.ObjectId() as unknown as Department;

      const createEmployeeDto: CreateEmployeeDto = {
        first_name: "John",
        last_name: "Doe",
        gender: EnumEmployee.MALE,
        department_id: department,
        pid: "EMP-1234",
        Joining_date: "2025-03-05",
      };

      await employeeController.create(createEmployeeDto);
      expect(employeeService.create).toHaveBeenCalledWith(createEmployeeDto);
    });
  });

  describe("findAll", () => {
    it("should return an array of employees", async () => {
      const result: Employee[] = [
        {
          _id: new mongoose.Types.ObjectId(),
          first_name: "John",
          last_name: "Doe",
          gender: "Male",
          status: "Enable",
          department_id: new mongoose.Types.ObjectId() as unknown as Department,
          pid: "EMP-1234",
          Joining_date: "2025-03-05",
        } as Employee,
      ];
      jest.spyOn(employeeService, "findAll").mockResolvedValue(result);

      expect(await employeeController.findAll()).toBe(result);
    });
  });

  describe("findOne", () => {
    it("should return a single employee", async () => {
      const result: Employee = {
        _id: new mongoose.Types.ObjectId(),
        first_name: "John",
        last_name: "Doe",
        gender: "Male",
        status: "Enable",
        department_id: new mongoose.Types.ObjectId() as unknown as Department,
        pid: "EMP-5678",
        Joining_date: "2025-03-05",
      } as Employee;

      const id = "1234";
      jest.spyOn(employeeService, "findById").mockResolvedValue(result);

      expect(await employeeController.findOne(id)).toBe(result);
    });
    //
    // it("should throw an error if employee not found", async () => {
    //   const id = "1234";
    //   jest.spyOn(employeeService, "findById").mockResolvedValue(null);
    //
    //   await expect(employeeController.findOne(id)).rejects.toThrow(NotFoundException);
    // });
  });

  describe("update", () => {
    it("should call employeeService.update with the correct data", async () => {
      const id = "1234";
      const updateEmployeeDto: UpdateEmployeeDto = {
        first_name: "John Updated",
        last_name: "Doe Updated",
      };

      await employeeController.update(id, updateEmployeeDto);
      expect(employeeService.update).toHaveBeenCalledWith(id, updateEmployeeDto);
    });
  });

  describe("remove", () => {
    it("should call employeeService.remove", async () => {
      const id = "1234";
      await employeeController.remove(id);
      expect(employeeService.remove).toHaveBeenCalledWith(id);
    });
  });
});
