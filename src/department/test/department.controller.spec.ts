import { Test, TestingModule } from "@nestjs/testing";

import { DepartmentController } from "../department.controller";
import { DepartmentService } from "../department.service";
import { CreateDepartmentDto } from "../dto/create-department.dto";
import { UpdateDepartmentDto } from "../dto/update-department.dto";
import { Type } from "../../settings/entities/type.enum";


describe("DepartmentController", () => {
  let departmentController: DepartmentController;
  let departmentService: DepartmentService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DepartmentController],
      providers: [
        {
          provide: DepartmentService,
          useValue: {
            create: jest.fn().mockResolvedValue("Department Created"),
            findAll: jest.fn().mockResolvedValue(["Department 1", "Department 2"]),
            findById: jest.fn().mockResolvedValue("Department 1"),
            update: jest.fn().mockResolvedValue("Department Updated"),
            remove: jest.fn().mockResolvedValue("Department Removed"),
          },
        },
      ],
    }).compile();

    departmentController = module.get<DepartmentController>(DepartmentController);
    departmentService = module.get<DepartmentService>(DepartmentService);
  });

  describe("create", () => {
    it("should call the service to create a department", async () => {
      const createDepartmentDto: CreateDepartmentDto = { name: "New Department",
        description: "A new department for testing",company: {
          name: "Test Company",
          sigle: "TC",
          description: "A company used for testing",
          enterprise_type: Type.PUBLIC,
          slogan: "Best Company",
          address: "123 Test St.",
          tel: "1234567890",
          logo: "logo.png",
          second_logo: "second_logo.png",
        },};
      const result = await departmentController.create(createDepartmentDto);
      expect(result).toBe("Department Created");
      expect(departmentService.create).toHaveBeenCalledWith(createDepartmentDto);
    });
  });

  describe("findAll", () => {
    it("should return an array of departments", async () => {
      const result = await departmentController.findAll();
      expect(result).toEqual(["Department 1", "Department 2"]);
      expect(departmentService.findAll).toHaveBeenCalled();
    });
  });

  describe("findOne", () => {
    it("should return a department by id", async () => {
      const result = await departmentController.findOne("1");
      expect(result).toBe("Department 1");
      expect(departmentService.findById).toHaveBeenCalledWith("1");
    });
  });

  describe("update", () => {
    it("should update a department", async () => {
      const updateDepartmentDto: UpdateDepartmentDto = { name: "Updated Department" };
      const result = await departmentController.update("1", updateDepartmentDto);
      expect(result).toBe("Department Updated");
      expect(departmentService.update).toHaveBeenCalledWith("1", updateDepartmentDto);
    });
  });

  describe("remove", () => {
    it("should remove a department", async () => {
      const result = await departmentController.remove("1");
      expect(result).toBe("Department Removed");
      expect(departmentService.remove).toHaveBeenCalledWith("1");
    });
  });
});
