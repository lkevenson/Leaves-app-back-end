import { CanActivate, ExecutionContext } from "@nestjs/common";

export class AuthenticatedGuard implements CanActivate {
  async canActivate(context: ExecutionContext) {
    const request = await context.switchToHttp().getRequest();
    return await request.isAuthenticated;
  }
}
