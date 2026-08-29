import type { NextFunction, Request, Response } from "express";
import { AppError } from "../utils/appError";
import { verifyAccessToken, type TokenPayload } from "../utils/jwt";

declare global {
  namespace Express {
    interface Request {
      user: TokenPayload;
    }
  }
}

const getBearerToken = (authorization: string | undefined): string | null => {
  if (!authorization) return null;

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

export const protect = (req: Request, _res: Response, next: NextFunction): void => {
  const token = getBearerToken(req.headers.authorization);

  if (!token) {
    next(new AppError("Authentication token is required", 401, "AUTH_TOKEN_REQUIRED"));
    return;
  }

  try {
    const payload = verifyAccessToken(token);

    if (!isValidPayload(payload)) {
      next(new AppError("Invalid access token", 401, "INVALID_ACCESS_TOKEN"));
      return;
    }

    req.user = payload;
    next();
  } catch {
    next(new AppError("Invalid or expired access token", 401, "INVALID_ACCESS_TOKEN"));
  }
};
