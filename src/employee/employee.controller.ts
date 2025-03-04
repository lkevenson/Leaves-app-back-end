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
import { CreateEmployeeDto } from "./dto/create-employee.dto";
import { UpdateEmployeeDto } from "./dto/update-employee.dto";
import { EmployeeService } from "./employee.service";

@Controller("employee")
export class EmployeeController {
  constructor(private readonly employeeService: EmployeeService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() createEmployeeDto: CreateEmployeeDto) {
    return this.employeeService.create(createEmployeeDto);
  }

  @Get()
  findAll() {
    return this.employeeService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.employeeService.findById(id);
  }

  @UseGuards(JwtAuthGuard)
  @Get("status/:stat")
  getByStatus(@Param("stat") status: string) {
    return this.employeeService.getByStatus(status);
  }

  @UseGuards(JwtAuthGuard)
  @Post("changeStatus/:id")
  changeStatus(@Param("id") id: string) {
    return this.employeeService.changeStatus(id);
  }

  @UseGuards(JwtAuthGuard)
  @Get("department/:id")
  getByDepartment(@Param("id") id: string) {
    return this.employeeService.getByDepartmentId(id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(":id")
  update(
    @Param("id") id: string,
    @Body() updateEmployeeDto: UpdateEmployeeDto
  ) {
    return this.employeeService.update(id, updateEmployeeDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.employeeService.remove(id);
  }
}
