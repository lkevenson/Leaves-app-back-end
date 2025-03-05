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
import { CreateLeaveDto } from "./dto/create-leave.dto";
import { UpdateLeaveDto } from "./dto/update-leave.dto";
import { LeaveService } from "./leave.service";

@Controller("leave")
export class LeaveController {
  constructor(private readonly leaveService: LeaveService) {}

  @Post()
  create(@Body() createLeaveDto: CreateLeaveDto) {
    return this.leaveService.create(createLeaveDto);
  }

  @UseGuards(JwtAuthGuard)
  @Post("status")
  findByStatus(@Body("status") status: string) {
    return this.leaveService.findByStatus(status);
  }

  @UseGuards(JwtAuthGuard)
  @Post("changeStatus/:id")
  changeStatus(@Param("id") id: string, @Body("status") status: string) {
    return this.leaveService.changeStatus(id, status);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll() {
    return this.leaveService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.leaveService.findById(id);
  }

  @UseGuards(JwtAuthGuard)
  @Get("employee/:id")
  getByEmployee(@Param("id") id: string) {
    return this.leaveService.getByEmployee(id);
  }

  @UseGuards(JwtAuthGuard)
  @Get("leave-type/:id")
  getByLeaveType(@Param("id") id: string) {
    return this.leaveService.getByLeaveType(id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(":id")
  update(@Param("id") id: string, @Body() updateLeaveDto: UpdateLeaveDto) {
    return this.leaveService.update(id, updateLeaveDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.leaveService.remove(id);
  }
}
