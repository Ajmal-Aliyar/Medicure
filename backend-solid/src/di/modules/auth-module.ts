import { AuthController, IAuthController } from "@/controllers";
import { AuthService, IAuthService } from "@/services";
import { Container } from "inversify";
import { TYPES } from "@/di/types";

export const bindAuthModule = async (container: Container) => {
  container.bind<IAuthService>(TYPES.AuthService).to(AuthService);
  container.bind<IAuthController>(TYPES.AuthController).to(AuthController);
};
