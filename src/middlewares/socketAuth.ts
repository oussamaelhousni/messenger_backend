import type { Socket } from "socket.io";
import { verifyAccessToken, type TokenPayload } from "../utils/jwt";

type SocketAuthNext = (error?: Error) => void;

const getToken = (socket: Socket): string | null => {
  const auth = socket.handshake.auth as Record<string, unknown> | undefined;
  const authToken = auth?.token ?? auth?.accessToken;

  if (typeof authToken === "string" && authToken.trim()) {
    return authToken.trim();
  }

  const authorization = socket.handshake.headers.authorization;
  if (typeof authorization !== "string") return null;

  const match = authorization.match(/^Bearer\s+(\S+)$/i);
  return match?.[1] ?? null;
};

const isValidPayload = (payload: TokenPayload): boolean => {
  return (
    Number.isInteger(payload.userId) &&
    payload.userId > 0 &&
    typeof payload.email === "string" &&
    payload.email.length > 0
  );
};

export const socketAuth = (socket: Socket, next: SocketAuthNext): void => {
  const token = getToken(socket);

  if (!token) {
    next(new Error("Authentication token is required"));
    return;
  }

  try {
    const payload = verifyAccessToken(token);

    if (!isValidPayload(payload)) {
      next(new Error("Invalid access token"));
      return;
    }

    socket.data.user = payload;
    next();
  } catch {
    next(new Error("Invalid or expired access token"));
  }
};
