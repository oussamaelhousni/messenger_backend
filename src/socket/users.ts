import type { Server as SocketIOServer, Socket } from "socket.io";
import type { TokenPayload } from "../utils/jwt";

export const getSockets = (io: SocketIOServer): Socket[] => {
  return Array.from(io.sockets.sockets.values());
};

export const getUserSockets = (io: SocketIOServer, userId: number): Socket[] => {
  return getSockets(io).filter((socket) => {
    const user = socket.data.user as TokenPayload | undefined;
    return user?.userId === userId;
  });
};

export const emitToUser = (
  io: SocketIOServer,
  userId: number,
  event: string,
  payload: unknown,
): void => {
  const sockets = getUserSockets(io, userId);

  sockets.forEach((socket) => {
    socket.emit(event, payload);
  });
};
