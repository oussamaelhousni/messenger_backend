import type { Request, Response } from "express";
import { updateUser as updateUserProfile } from "../services/user.service";
import { asyncHandler } from "../utils/asyncHandler";

export const updateUser = asyncHandler(async (req: Request, res: Response) => {
  const user = await updateUserProfile(req.user.userId, req.body);

  return res.status(200).json({
    success: true,
    data: { user },
  });
});
