import {
  pgTable,
  varchar,
  integer,
  timestamp,
  unique,
  text,
} from "drizzle-orm/pg-core";
import { users } from "./users";
import { conversations } from "./conversations";

export const messages = pgTable("messages", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  from: integer()
    .notNull()
    .references(() => users.id),
  to: integer()
    .notNull()
    .references(() => users.id),
  conversationId: integer()
    .notNull()
    .references(() => conversations.id),
  content: text().notNull(),
  createdAt: timestamp().defaultNow(),
  updatedAt: timestamp(),
});
