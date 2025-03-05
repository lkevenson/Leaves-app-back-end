import { Test, TestingModule } from "@nestjs/testing";
import { HolidaysService } from "../holidays.service";
import { getModelToken } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Holiday } from "../entities/holiday.schema";
import { NotAcceptableException } from "@nestjs/common";
import { CreateHolidayDto } from "../dto/create-holiday.dto";

describe("HolidaysService", () => {
  let service: HolidaysService;
  let model: Model<Holiday>;

  const mockHolidayModel = {
    find: jest.fn(),
    create: jest.fn(),
    save: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        HolidaysService,
        {
          provide: getModelToken(Holiday.name),
          useValue: mockHolidayModel,
        },
      ],
    }).compile();

    service = module.get<HolidaysService>(HolidaysService);
    model = module.get<Model<Holiday>>(getModelToken(Holiday.name));
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });

  describe("create", () => {
    // it("should create a new holiday", async () => {
    //   const createHolidayDto: CreateHolidayDto = {
    //     name: "Christmas",
    //     day: 25,
    //     month: "December",
    //     year: 2025,
    //   };
    //
    //   const resultHoliday = {
    //     name: "Christmas",
    //     day: 25,
    //     month: "December",
    //     year: 2025,
    //     success: true,
    //     error: null,
    //   };
    //
    //   mockHolidayModel.find.mockResolvedValueOnce([]);
    //   const saveMock = jest.fn().mockResolvedValueOnce(createHolidayDto as any);
    //   mockHolidayModel.create.mockImplementationOnce(() => ({
    //     ...createHolidayDto,
    //     save: saveMock,
    //   }));
    //
    //   const result = await service.create(createHolidayDto);
    //   expect(result).toEqual(resultHoliday);
    //
    //   expect(mockHolidayModel.find).toHaveBeenCalledWith({
    //     day: createHolidayDto.day,
    //     month: createHolidayDto.month,
    //     year: createHolidayDto.year,
    //   });
    //   expect(mockHolidayModel.create).toHaveBeenCalledWith(createHolidayDto);
    // });

    it("should throw an exception if holiday already exists for the given day", async () => {
      const createHolidayDto: CreateHolidayDto = {
        name: "Christmas",
        day: 25,
        month: "December",
        year: 2025,
      };

      mockHolidayModel.find.mockResolvedValueOnce([{}]);

      const result = await service.create(createHolidayDto);
      expect(result).toEqual({
        success: false,
        error: "This day has already been.",
      });
      expect(mockHolidayModel.find).toHaveBeenCalledWith({
        day: createHolidayDto.day,
        month: createHolidayDto.month,
        year: createHolidayDto.year,
      });
    });
  });
});
