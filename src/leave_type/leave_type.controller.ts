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
import { CreateLeaveTypeDto } from "./dto/create-leave_type.dto";
import { UpdateLeaveTypeDto } from "./dto/update-leave_type.dto";
import { LeaveTypeService } from "./leave_type.service";
import { JwtAuthGuard } from "../auth/jwt-auth.guard";

@Controller("leave-type")
export class LeaveTypeController {
  constructor(private readonly leaveTypeService: LeaveTypeService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() createLeaveTypeDto: CreateLeaveTypeDto) {
    return this.leaveTypeService.create(createLeaveTypeDto);
  }

  @Get()
  findAll() {
    return this.leaveTypeService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.leaveTypeService.findById(id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(":id")
  update(
    @Param("id") id: string,
    @Body() updateLeaveTypeDto: UpdateLeaveTypeDto
  ) {
    return this.leaveTypeService.update(id, updateLeaveTypeDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.leaveTypeService.remove(id);
  }
}
