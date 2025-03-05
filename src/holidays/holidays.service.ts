import { Injectable, NotAcceptableException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";

import { CreateHolidayDto } from "./dto/create-holiday.dto";
import { Holiday } from "./entities/holiday.schema";
import { BaseService } from "../utils/base-services";
import { Response } from "../utils/response";
import { FiscalYear } from "../fiscal/entities/fiscal.schema";

@Injectable()
export class HolidaysService extends BaseService<Holiday> {
  constructor(@InjectModel(Holiday.name) protected holidayModel: Model<Holiday>) {super(holidayModel);}

  async create(data: CreateHolidayDto): Promise<Holiday | Response<any>> {
    try {
      const findHoliday = await this.holidayModel.find({
        day: data.day,
        month: data.month,
        year: data.year,
      });

      if (findHoliday.length > 0)
        throw new NotAcceptableException("This day has already been.");

      const newHoliday = new this.holidayModel(data);
      await newHoliday.save();
      return newHoliday;
      // return { success: true, error: null, ...newHoliday };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }
}
