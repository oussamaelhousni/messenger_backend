import { Request, Response } from "express";
import {
  register as registerUser,
  login as loginUser,
  refreshToken as refreshUserToken,
} from "../services/auth.service";
import { asyncHandler } from "../utils/asyncHandler";

export const register = asyncHandler(async (req: Request, res: Response) => {
  const data = req.body;
  const result = await registerUser(data, req.language);
  return res.status(201).json({
    success: true,
    message: req.t("USER_REGISTERED_SUCCESS"),
    data: result,
  });
});

export const login = asyncHandler(async (req: Request, res: Response) => {
  const data = req.body;
  const result = await loginUser(data);
  return res.status(200).json({
    success: true,
    message: req.t("LOGIN_SUCCESS"),
    data: result,
  });
});

export const refreshToken = asyncHandler(async (req: Request, res: Response) => {
  const { refreshToken: token } = req.body;
  const result = await refreshUserToken(token);
  return res.status(200).json({
    success: true,
    message: req.t("TOKEN_REFRESHED_SUCCESS"),
    data: result,
  });
});
