import { Test, TestingModule } from "@nestjs/testing";
import { LeaveTypeController } from "../leave_type.controller";
import { LeaveTypeService } from "../leave_type.service";
import { CreateLeaveTypeDto } from "../dto/create-leave_type.dto";
import { UpdateLeaveTypeDto } from "../dto/update-leave_type.dto";

describe("LeaveTypeController", () => {
  let controller: LeaveTypeController;
  let service: LeaveTypeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LeaveTypeController],
      providers: [
        {
          provide: LeaveTypeService,
          useValue: {
            create: jest.fn(),
            findAll: jest.fn(),
            findById: jest.fn(),
            update: jest.fn(),
            remove: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<LeaveTypeController>(LeaveTypeController);
    service = module.get<LeaveTypeService>(LeaveTypeService);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });

  it("should create a leave type", async () => {
    const createDto: CreateLeaveTypeDto = { name: "Sick Leave", description: "For illness", number_of_days: 10 };
    const createdLeaveType = { ...createDto, _id: "123" };

    jest.spyOn(service, "create").mockResolvedValue(createdLeaveType);

    const result = await controller.create(createDto);

    expect(result).toEqual(createdLeaveType);
  });

  it("should get all leave types", async () => {
    const leaveTypes = [
      { name: "Sick Leave", description: "For illness", number_of_days: 10 },
      { name: "Vacation Leave", description: "For vacation", number_of_days: 15 },
    ];

    jest.spyOn(service, "findAll").mockResolvedValue(leaveTypes);

    const result = await controller.findAll();

    expect(result).toEqual(leaveTypes);
  });

  it("should get a leave type by ID", async () => {
    const leaveType = { _id: "123", name: "Sick Leave", description: "For illness", number_of_days: 10 };

    jest.spyOn(service, "findById").mockResolvedValue(leaveType);

    const result = await controller.findOne("123");

    expect(result).toEqual(leaveType);
  });

  // it("should throw error if leave type not found by ID", async () => {
  //   jest.spyOn(service, "findById").mockResolvedValue(null);
  //
  //   await expect(controller.findOne("123")).rejects.toThrowError(NotFoundException);
  // });

  it("should update a leave type", async () => {
    const updateDto: UpdateLeaveTypeDto = { name: "Paid Leave" };
    const updatedLeaveType = { _id: "123", name: "Paid Leave", description: "For paid leave", number_of_days: 10 };

    jest.spyOn(service, "update").mockResolvedValue(updatedLeaveType);

    const result = await controller.update("123", updateDto);

    expect(result).toEqual(updatedLeaveType);
  });

  // it("should delete a leave type", async () => {
  //   jest.spyOn(service, "remove").mockResolvedValue(true);
  //
  //   const result = await controller.remove("123");
  //
  //   expect(result).toBe(true);
  // });
});
