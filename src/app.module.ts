import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { MongooseModule } from "@nestjs/mongoose";
import { AuthModule } from "./auth/auth.module";
import { DepartmentModule } from "./department/department.module";
import { EmployeeModule } from "./employee/employee.module";
import { FiscalModule } from "./fiscal/fiscal.module";
import { HolidaysModule } from "./holidays/holidays.module";
import { LeaveModule } from "./leave/leave.module";
import { LeaveTypeModule } from "./leave_type/leave_type.module";
import { PermissionModule } from "./permission/permission.module";
import { RolesModule } from "./roles/roles.module";
import { SettingsModule } from "./settings/settings.module";
import { UsersModule } from "./users/users.module";

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ".prod.env",
      isGlobal: true,
    }),
    MongooseModule.forRoot(process.env.MONGO_URL_DB),
    AuthModule,
    UsersModule,
    SettingsModule,
    DepartmentModule,
    RolesModule,
    PermissionModule,
    LeaveTypeModule,
    HolidaysModule,
    EmployeeModule,
    LeaveModule,
    FiscalModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
