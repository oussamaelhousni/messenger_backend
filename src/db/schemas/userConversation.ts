import { pgTable, integer, timestamp, primaryKey } from "drizzle-orm/pg-core";

import { users } from "./users";
import { conversations } from "./conversations";

export const usersConversations = pgTable(
  "users_conversations",
  {
    userId: integer()
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),

    conversationId: integer()
      .notNull()
      .references(() => conversations.id, { onDelete: "cascade" }),

    joinedAt: timestamp().defaultNow().notNull(),
  },
  (table) => [
    primaryKey({
      columns: [table.userId, table.conversationId],
    }),
  ],
);
