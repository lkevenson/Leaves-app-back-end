import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { Holiday, HolidaySchema } from "./entities/holiday.schema";
import { HolidaysController } from "./holidays.controller";
import { HolidaysService } from "./holidays.service";

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Holiday.name, schema: HolidaySchema }]),
  ],
  controllers: [HolidaysController],
  providers: [HolidaysService],
})
export class HolidaysModule {}
