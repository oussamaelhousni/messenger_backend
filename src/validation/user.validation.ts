import { z } from "zod";

export const registerSchema = z.object({
  fullName: z
    .string()
    .min(2, "NAME_MIN_LENGTH")
    .max(50, "NAME_MAX_LENGTH"),

  email: z
    .string()
    .email("INVALID_EMAIL")
    .toLowerCase(),

  password: z
    .string()
    .min(8, "PASSWORD_MIN_LENGTH")
    .max(72, "PASSWORD_MAX_LENGTH"),
});

export const loginSchema = z.object({
  email: z
    .string()
    .email("INVALID_EMAIL")
    .toLowerCase(),

  password: z
    .string()
    .min(1, "PASSWORD_REQUIRED"),
});

export const refreshTokenSchema = z.object({
  refreshToken: z
    .string()
    .min(1, "REFRESH_TOKEN_REQUIRED"),
});

export type RegisterInput = z.infer<typeof registerSchema>;
export type LoginInput = z.infer<typeof loginSchema>;
export type RefreshTokenInput = z.infer<typeof refreshTokenSchema>;
