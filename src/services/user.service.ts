import { eq } from "drizzle-orm";
import db from "../db";
import { users } from "../db/schemas/users";
import { AppError } from "../utils/appError";
import type { UpdateUserInput } from "../validation/user.validation";

export const updateUser = async (userId: number, data: UpdateUserInput) => {
  const [user] = await db
    .update(users)
    .set({
      ...data,
      updatedAt: new Date(),
    })
    .where(eq(users.id, userId))
    .returning({
      id: users.id,
      fullName: users.fullName,
      email: users.email,
      avatar: users.avatar,
      createdAt: users.createdAt,
      updatedAt: users.updatedAt,
    });

  if (!user) {
    throw new AppError("User not found", 404, "USER_NOT_FOUND");
  }

  return user;
};
