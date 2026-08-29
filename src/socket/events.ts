import type { Server as SocketIOServer, Socket } from "socket.io";
import type { TokenPayload } from "../utils/jwt";
import { emitToUser } from "./users";

type SendMessagePayload = {
  recipientId: number;
  content: string;
};

const getSocketUser = (socket: Socket): TokenPayload => {
  return socket.data.user as TokenPayload;
};

const handleConnection = (io: SocketIOServer, socket: Socket): void => {
  const user = getSocketUser(socket);

  console.log(`Socket connected: user ${user.userId}`);
  socket.emit("connection:ready", { userId: user.userId });

  socket.on("disconnect", (reason) => {
    console.log(`Socket disconnected: user ${user.userId} (${reason})`);
  });
};

export const registerSocketEvents = (io: SocketIOServer): void => {
  io.on("connection", (socket) => handleConnection(io, socket));
};
