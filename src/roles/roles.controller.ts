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
import { CreateRoleDto } from "./dto/create-role.dto";
import { UpdateRoleDto } from "./dto/update-role.dto";
import { RolesService } from "./roles.service";

@UseGuards(JwtAuthGuard)
@Controller("roles")
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}

  @Post()
  create(
    @Body() createRoleDto: CreateRoleDto,
    @Body("permissions") ids: string[]
  ) {
    return this.rolesService.create({
      ...createRoleDto,
      role_permissions: ids,
    });
  }

  @Get()
  findAll() {
    return this.rolesService.findAll();
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.rolesService.findById(id);
  }

  @Patch(":id")
  update(
    @Param("id") id: string,
    @Body() updateRoleDto: UpdateRoleDto,
    @Body("permissions") ids: string[]
  ) {
    return this.rolesService.update(id, {
      ...updateRoleDto,
      role_permissions: ids,
    });
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.rolesService.remove(id);
  }
}
