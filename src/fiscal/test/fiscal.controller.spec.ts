import { CreateFiscalDto } from "../dto/create-fiscal.dto";
import { FiscalService } from "../fiscal.service";
import { FiscalController } from "../fiscal.controller";
import { Test, TestingModule } from "@nestjs/testing";
import { UpdateFiscalDto } from "../dto/update-fiscal.dto";
import { StatusFiscalYear } from "../entities/fiscal.schema";
import { NotFoundException } from "@nestjs/common";

describe("FiscalController", () => {
  let fiscalController: FiscalController;
  let fiscalService: FiscalService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FiscalController],
      providers: [
        {
          provide: FiscalService,
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

    fiscalController = module.get<FiscalController>(FiscalController);
    fiscalService = module.get<FiscalService>(FiscalService);
  });

  it("should be defined", () => {
    expect(fiscalController).toBeDefined();
  });

  describe("create", () => {
    it("should call fiscalService.create with the correct data", async () => {
      const createFiscalDto: CreateFiscalDto = {
        year: 2025,
        fiscalStart: "2025-01-01",
        fiscalEnd: "2025-12-31",
      };
      await fiscalController.create(createFiscalDto);
      expect(fiscalService.create).toHaveBeenCalledWith(createFiscalDto);
    });
  });

  describe("findAll", () => {
    it("should return an array of fiscal years", async () => {
      const result = [
        {
          year: 2025,
          fiscalStart: "2025-01-01",
          fiscalEnd: "2025-12-31",
          status: StatusFiscalYear.ENABLE,
        },
      ];
      jest.spyOn(fiscalService, "findAll").mockResolvedValue(result);

      expect(await fiscalController.findAll()).toBe(result);
    });
  });

  describe("findOne", () => {
    it("should return a single fiscal year", async () => {
      const result = {
        year: 2025,
        fiscalStart: "2025-01-01",
        fiscalEnd: "2025-12-31",
        status: StatusFiscalYear.ENABLE,
      };
      const id = "1234";
      jest.spyOn(fiscalService, "findById").mockResolvedValue(result);

      expect(await fiscalController.findOne(id)).toBe(result);
    });

    // it("should throw an error if fiscal year not found", async () => {
    //   const id = "1234";
    //   jest.spyOn(fiscalService, "findById").mockResolvedValue(null);
    //
    //   await expect(fiscalController.findOne(id)).rejects.toThrow(NotFoundException);
    // });
  });

  describe("update", () => {
    it("should call fiscalService.update with the correct data", async () => {
      const id = "1234";
      const updateFiscalDto: UpdateFiscalDto = {
        fiscalStart: "2025-02-01",
        fiscalEnd: "2025-12-31",
      };
      await fiscalController.update(id, updateFiscalDto);
      expect(fiscalService.update).toHaveBeenCalledWith(id, updateFiscalDto);
    });
  });

  describe("remove", () => {
    it("should call fiscalService.remove", async () => {
      const id = "1234";
      await fiscalController.remove(id);
      expect(fiscalService.remove).toHaveBeenCalledWith(id);
    });
  });
});
