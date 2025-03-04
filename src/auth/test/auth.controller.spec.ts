import { Test, TestingModule } from "@nestjs/testing";
import { AuthController } from "../auth.controller";
import { AuthService } from "../auth.service";
import { LocalAuthGuard } from "../local-auth.guard";
import { JwtAuthGuard } from "../jwt-auth.guard";
import { ExecutionContext } from "@nestjs/common";

describe("AuthController", () => {
  let authController: AuthController;
  let authService: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: AuthService,
          useValue: {
            login: jest.fn().mockResolvedValue({ access_token: "mocked-token" }),
          },
        },
      ],
    }).compile();

    authController = module.get<AuthController>(AuthController);
    authService = module.get<AuthService>(AuthService);
  });

  describe("login", () => {
    it("should return a JWT token", async () => {
      const req = { user: { username: "test" } };
      const result = await authController.login(req);
      expect(result).toEqual({ access_token: "mocked-token" });
      expect(authService.login).toHaveBeenCalledWith(req.user);
    });
  });

  describe("getHello (protected route)", () => {
    it("should return user data if authenticated", () => {
      const req = { user: { id: 1, username: "testUser" } };
      expect(authController.getHello(req)).toEqual(req.user);
    });
  });
});
