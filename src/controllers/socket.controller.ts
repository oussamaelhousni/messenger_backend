import type { Request, Response } from "express";
import { WebSocketServer } from "../socket";
import { getSockets } from "../socket/users";
import { asyncHandler } from "../utils/asyncHandler";

export const getSocket = asyncHandler(async (_req: Request, res: Response) => {
  const io = WebSocketServer.getInstance();
  const sockets = getSockets(io);

  return res.status(200).json({
    success: true,
    data: {
      socketIds: sockets.map((socket) => socket.id),
    },
  });
});
