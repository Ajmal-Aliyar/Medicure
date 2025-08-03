import { Socket } from "socket.io";
import { ExtendedError } from "socket.io/dist/namespace";
import { TYPES } from "@/di/types";
import { getContainer } from "@/di";
import { ITokenService } from "@/interfaces";
import { UnauthorizedError } from "@/errors";
import { GLOBAL_MESSAGES } from "@/constants/messages";
import cookie from "cookie";

export const socketAuthMiddleware = async (
  socket: Socket,
  next: (err?: ExtendedError) => void
) => {
  try {
    const container = getContainer();
    const tokenService = container.get<ITokenService>(TYPES.TokenService);

    const cookies = cookie.parse(socket.handshake.headers?.cookie || "");
    const token = cookies.accessToken;

    if (!token) {
      throw new UnauthorizedError(GLOBAL_MESSAGES.ERROR.ACCESS_TOKEN_MISSING);
    }

    const { id, role } = tokenService.verifyAccessToken(token);

    if (!id || !role) {
      throw new UnauthorizedError("GLOBAL_MESSAGES.ERROR.ACCESS_TOKEN_INVALID");
    }

    socket.data.user = { id, role };
    console.log(id, role, 'asdfa')
    next();
  } catch (error) {
    console.log("Socket Auth Error:", error);
    next(
      new UnauthorizedError( "GLOBAL_MESSAGES.ERROR.ACCESS_TOKEN_INVALID")
    );
  }
};
