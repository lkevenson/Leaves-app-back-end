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
import { CreateFiscalDto } from "./dto/create-fiscal.dto";
import { UpdateFiscalDto } from "./dto/update-fiscal.dto";
import { FiscalService } from "./fiscal.service";
import { JwtAuthGuard } from "../auth/jwt-auth.guard";

@UseGuards(JwtAuthGuard)
@Controller("fiscal-year")
export class FiscalController {
  constructor(private readonly fiscalService: FiscalService) {}

  @Post()
  create(@Body() createFiscalDto: CreateFiscalDto) {
    return this.fiscalService.create(createFiscalDto);
  }

  @Get()
  findAll() {
    return this.fiscalService.findAll();
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.fiscalService.findById(id);
  }

  @Patch(":id")
  update(@Param("id") id: string, @Body() updateFiscalDto: UpdateFiscalDto) {
    return this.fiscalService.update(id, updateFiscalDto);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.fiscalService.remove(id);
  }
}
