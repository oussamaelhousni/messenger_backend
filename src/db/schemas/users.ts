import { pgTable, integer, varchar, timestamp } from "drizzle-orm/pg-core";

export const users = pgTable("user", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  fullName: varchar("fullName", { length: 50 }).notNull(),
  email: varchar("email", { length: 255 }).notNull().unique(),
  password: varchar("password", { length: 255 }).notNull(),
  avatar: varchar("avatar", { length: 500 }),
  failedLoginAttempts: integer("failedLoginAttempts").notNull().default(0),
  lockedUntil: timestamp("lockedUntil"),
  createdAt: timestamp().defaultNow(),
  updatedAt: timestamp(),
});
