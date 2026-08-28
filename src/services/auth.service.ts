import bcrypt from "bcrypt";
import { eq } from "drizzle-orm";
import db from "../db";
import { users } from "../db/schemas/users";
import { AppError } from "../utils/appError";
import { sendEmail } from "../utils/sendEmail";
import { generateAccessToken, generateRefreshToken, verifyRefreshToken } from "../utils/jwt";
import { t, type SupportedLanguage } from "../i18n";
import type { LoginInput, RegisterInput } from "../validation/user.validation";

const SALT_ROUNDS = 10;
const MAX_LOGIN_ATTEMPTS = 3;
const LOCK_DURATION_MS = 3 * 60 * 60 * 1000;

const getLockRemaining = (lockedUntil: Date) => {
  const remainingMs = Math.max(0, lockedUntil.getTime() - Date.now());
  const hours = Math.floor(remainingMs / (60 * 60 * 1000));
  const minutes = Math.ceil((remainingMs % (60 * 60 * 1000)) / (60 * 1000));

  return { hours, minutes };
};

const throwAccountLocked = (lockedUntil: Date): never => {
  const { hours, minutes } = getLockRemaining(lockedUntil);
  throw new AppError(
    "Too many failed login attempts",
    429,
    "ACCOUNT_LOCKED",
    { hours, minutes },
  );
};

export const register = async (data: RegisterInput, lang: SupportedLanguage = "en") => {
  // Hash password before saving to database
  const hashedPassword = await bcrypt.hash(data.password, SALT_ROUNDS);

  try {
    const [user] = await db
      .insert(users)
      .values({
        ...data,
        password: hashedPassword,
      })
      .returning({
        id: users.id,
        fullName: users.fullName,
        email: users.email,
        avatar: users.avatar,
        createdAt: users.createdAt,
        updatedAt: users.updatedAt,
      });

    const subject = t("WELCOME_EMAIL_SUBJECT", lang);
    const title = t("WELCOME_EMAIL_TITLE", lang, { name: user.fullName });
    const body = t("WELCOME_EMAIL_BODY", lang);

    await sendEmail({
      to: user.email,
      subject,
      html: `<h1>${title}</h1><p>${body}</p>`,
      text: `${title}\n\n${body}`,
    });

    const accessToken = generateAccessToken({ userId: user.id, email: user.email });
    const refreshToken = generateRefreshToken({ userId: user.id, email: user.email });

    return {
      user,
      accessToken,
      refreshToken,
    };
  } catch (error: any) {
    const errorCode = error?.code || error?.cause?.code;
    if (errorCode === "23505") {
      throw new AppError("Email already exists", 400, "EMAIL_ALREADY_EXISTS");
    }
    throw error;
  }
};

export const login = async (data: LoginInput) => {
  const [user] = await db
    .select()
    .from(users)
    .where(eq(users.email, data.email))
    .limit(1);

  if (!user) {
    throw new AppError("Invalid email or password", 401, "INVALID_CREDENTIALS");
  }

  const now = new Date();

  if (user.lockedUntil && user.lockedUntil > now) {
    throwAccountLocked(user.lockedUntil);
  }

  const isPasswordMatch = await bcrypt.compare(data.password, user.password);

  if (!isPasswordMatch) {
    const failedAttempts = (user.lockedUntil && user.lockedUntil <= now)
      ? 1
      : (user.failedLoginAttempts ?? 0) + 1;

    if (failedAttempts >= MAX_LOGIN_ATTEMPTS) {
      const lockedUntil = new Date(now.getTime() + LOCK_DURATION_MS);

      await db
        .update(users)
        .set({ failedLoginAttempts: failedAttempts, lockedUntil })
        .where(eq(users.id, user.id));

      throwAccountLocked(lockedUntil);
    }

    await db
      .update(users)
      .set({ failedLoginAttempts: failedAttempts, lockedUntil: null })
      .where(eq(users.id, user.id));

    throw new AppError("Invalid email or password", 401, "INVALID_CREDENTIALS");
  }

  await db
    .update(users)
    .set({ failedLoginAttempts: 0, lockedUntil: null })
    .where(eq(users.id, user.id));

  const accessToken = generateAccessToken({ userId: user.id, email: user.email });
  const refreshToken = generateRefreshToken({ userId: user.id, email: user.email });

  const { password: _, failedLoginAttempts: __, lockedUntil: ___, ...userWithoutPassword } = user;

  return {
    user: userWithoutPassword,
    accessToken,
    refreshToken,
  };
};

export const refreshToken = async (token: string) => {
  try {
    const payload = verifyRefreshToken(token);

    // Verify user still exists in database
    const [user] = await db
      .select({ id: users.id, email: users.email })
      .from(users)
      .where(eq(users.id, payload.userId))
      .limit(1);

    if (!user) {
      throw new AppError("User not found", 401, "USER_NOT_FOUND");
    }

    const newAccessToken = generateAccessToken({ userId: user.id, email: user.email });
    const newRefreshToken = generateRefreshToken({ userId: user.id, email: user.email });

    return {
      accessToken: newAccessToken,
      refreshToken: newRefreshToken,
    };
  } catch (error: any) {
    if (error instanceof AppError) {
      throw error;
    }
    throw new AppError("Invalid or expired refresh token", 401, "INVALID_REFRESH_TOKEN");
  }
};
