import { Test, TestingModule } from "@nestjs/testing";
import { HolidaysController } from "../holidays.controller";
import { HolidaysService } from "../holidays.service";
import { CreateHolidayDto } from "../dto/create-holiday.dto";
import { NotAcceptableException } from "@nestjs/common";

describe("HolidaysController", () => {
  let controller: HolidaysController;
  let service: HolidaysService;

  const mockHolidayService = {
    create: jest.fn(),
    findAll: jest.fn(),
    findById: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HolidaysController],
      providers: [
        {
          provide: HolidaysService,
          useValue: mockHolidayService,
        },
      ],
    }).compile();

    controller = module.get<HolidaysController>(HolidaysController);
    service = module.get<HolidaysService>(HolidaysService);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });

  describe("create", () => {
    it("should create a new holiday", async () => {
      const createHolidayDto: CreateHolidayDto = {
        name: "Christmas",
        day: 25,
        month: "December",
        year: 2025,
      };

      mockHolidayService.create.mockResolvedValue(createHolidayDto);

      const result = await controller.create(createHolidayDto);
      expect(result).toEqual(createHolidayDto);
      expect(mockHolidayService.create).toHaveBeenCalledWith(createHolidayDto);
    });

    it("should throw an exception if holiday already exists", async () => {
      const createHolidayDto: CreateHolidayDto = {
        name: "Christmas",
        day: 25,
        month: "December",
        year: 2025,
      };

      mockHolidayService.create.mockRejectedValue(
        new NotAcceptableException("This day has already been.")
      );

      await expect(controller.create(createHolidayDto)).rejects.toThrow(
        new NotAcceptableException("This day has already been.")
      );
    });
  });

  describe("findAll", () => {
    it("should return an array of holidays", async () => {
      const holidays = [
        { name: "Christmas", day: 25, month: "December", year: 2025 },
      ];

      mockHolidayService.findAll.mockResolvedValue(holidays);

      const result = await controller.findAll();
      expect(result).toEqual(holidays);
    });
  });

  describe("findOne", () => {
    it("should return a holiday by id", async () => {
      const holiday = { name: "Christmas", day: 25, month: "December", year: 2025 };
      const id = "1";

      mockHolidayService.findById.mockResolvedValue(holiday);

      const result = await controller.findOne(id);
      expect(result).toEqual(holiday);
      expect(mockHolidayService.findById).toHaveBeenCalledWith(id);
    });
  });

  describe("update", () => {
    it("should update a holiday", async () => {
      const updateHolidayDto = { name: "Updated Holiday", day: 25, month: "December", year: 2025 };
      const id = "1";

      mockHolidayService.update.mockResolvedValue(updateHolidayDto);

      const result = await controller.update(id, updateHolidayDto);
      expect(result).toEqual(updateHolidayDto);
      expect(mockHolidayService.update).toHaveBeenCalledWith(id, updateHolidayDto);
    });
  });

  describe("remove", () => {
    it("should remove a holiday", async () => {
      const id = "1";

      mockHolidayService.remove.mockResolvedValue({ success: true });

      const result = await controller.remove(id);
      expect(result).toEqual({ success: true });
      expect(mockHolidayService.remove).toHaveBeenCalledWith(id);
    });
  });
});
