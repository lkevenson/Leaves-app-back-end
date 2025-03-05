import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";
import { UsersModule } from "src/users/users.module";
import appConfig from "src/utils/app.config";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { JwtStrategy } from "./jwt.stategy";
import { LocalStrategy } from "./local.strategy";

@Module({
  imports: [
    JwtModule.registerAsync({
      useFactory: () => ({
        secret: appConfig().appSecret,
        signOptions: { expiresIn: `2d` },
      }),
    }),
    UsersModule,
    PassportModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, JwtStrategy],
  exports: [JwtModule, JwtStrategy],
})
export class AuthModule {}
