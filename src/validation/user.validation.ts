import { z } from "zod";

export const registerSchema = z.object({
  fullName: z
    .string()
    .min(2, { error: "NAME_MIN_LENGTH" })
    .max(50, { error: "NAME_MAX_LENGTH" }),

  email: z.email({ error: "INVALID_EMAIL" }).toLowerCase(),

  password: z
    .string()
    .min(8, { error: "PASSWORD_MIN_LENGTH" })
    .max(72, { error: "PASSWORD_MAX_LENGTH" }),
});

export const loginSchema = z.object({
  email: z.email({ error: "INVALID_EMAIL" }).toLowerCase(),

  password: z
    .string()
    .min(1, { error: "PASSWORD_REQUIRED" }),
});

export const refreshTokenSchema = z.object({
  refreshToken: z
    .string()
    .min(1, { error: "REFRESH_TOKEN_REQUIRED" }),
});

export const updateUserSchema = z
  .object({
    fullName: z
      .string()
      .min(2, { error: "NAME_MIN_LENGTH" })
      .max(50, { error: "NAME_MAX_LENGTH" })
      .optional(),
    avatar: z.string().max(500).nullable().optional(),
  })
  .refine((data) => data.fullName !== undefined || data.avatar !== undefined, {
    error: "At least one profile field is required",
  });

export type RegisterInput = z.infer<typeof registerSchema>;
export type LoginInput = z.infer<typeof loginSchema>;
export type RefreshTokenInput = z.infer<typeof refreshTokenSchema>;
export type UpdateUserInput = z.infer<typeof updateUserSchema>;
