import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from "@nestjs/common";
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";
import { CreateHolidayDto } from "./dto/create-holiday.dto";
import { UpdateHolidayDto } from "./dto/update-holiday.dto";
import { HolidaysService } from "./holidays.service";

@UseGuards(JwtAuthGuard)
@Controller("holidays")
export class HolidaysController {
  constructor(private readonly holidaysService: HolidaysService) {}

  @Post()
  create(@Body() createHolidayDto: CreateHolidayDto) {
    return this.holidaysService.create(createHolidayDto);
  }

  @Get()
  findAll() {
    return this.holidaysService.findAll();
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.holidaysService.findById(id);
  }

  @Patch(":id")
  update(@Param("id") id: string, @Body() updateHolidayDto: UpdateHolidayDto) {
    return this.holidaysService.update(id, updateHolidayDto);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.holidaysService.remove(id);
  }
}
