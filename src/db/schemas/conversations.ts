import {
  pgTable,
  varchar,
  integer,
  timestamp,
  unique,
} from "drizzle-orm/pg-core";

export const conversations = pgTable("conversations", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  lastMessage: varchar(),
  createdAt: timestamp().defaultNow(),
  updatedAt: timestamp(),
  avatar: varchar(),
});
