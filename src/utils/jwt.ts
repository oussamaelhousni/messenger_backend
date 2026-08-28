import jwt, { JwtPayload } from "jsonwebtoken";
import env from "../env";

export interface TokenPayload extends JwtPayload {
  userId: number;
  email: string;
}

export const generateAccessToken = (payload: { userId: number; email: string }): string => {
  return jwt.sign(payload, env.JWT_SECRET, {
    expiresIn: "15m",
  });
};

export const generateRefreshToken = (payload: { userId: number; email: string }): string => {
  return jwt.sign(payload, env.JWT_REFRESH_SECRET, {
    expiresIn: "7d",
  });
};

export const verifyAccessToken = (token: string): TokenPayload => {
  return jwt.verify(token, env.JWT_SECRET) as TokenPayload;
};

export const verifyRefreshToken = (token: string): TokenPayload => {
  return jwt.verify(token, env.JWT_REFRESH_SECRET) as TokenPayload;
};
