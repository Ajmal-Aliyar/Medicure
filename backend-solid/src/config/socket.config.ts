import { ServerOptions } from 'socket.io';
import { env } from './env.config';

export const config = {
  socketOptions: {
    cors: {
      origin: [env.FRONTEND_BASE_URL],
      methods: ['GET', 'POST'],
      credentials: true,
    },
    transports: ['websocket', 'polling'], 
  } satisfies Partial<ServerOptions>,
};
