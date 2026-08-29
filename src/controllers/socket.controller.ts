import type { Request, Response } from "express";
import { WebSocketServer } from "../socket";
import { getUserSockets } from "../socket/users";
import { asyncHandler } from "../utils/asyncHandler";

export const getSocket = asyncHandler(async (req: Request, res: Response) => {
  const io = WebSocketServer.getInstance();
  const sockets = getUserSockets(io, req.user.userId);

  return res.status(200).json({
    success: true,
    data: {
      userId: req.user.userId,
      socketIds: sockets.map((socket) => socket.id),
    },
  });
});
