import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import appConfig from "src/utils/app.config";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: appConfig().appSecret,
      secretOrPrivateKey: true,
    });
  }

  async validate(payload: any): Promise<any> {
    return {
      id: payload.sub,
      email: payload.email,
    };
  }
}
