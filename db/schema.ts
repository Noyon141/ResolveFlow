import {
  boolean,
  index,
  integer,
  jsonb,
  pgEnum,
  pgTable,
  primaryKey,
  text,
  timestamp,
  uuid,
} from "drizzle-orm/pg-core";

export const user = pgTable("user", {
  id: uuid("id").primaryKey().defaultRandom(),

  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  emailVerified: boolean("email_verified").default(false).notNull(),

  image: text("image"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .$onUpdate(() => /* @__PURE__ */ new Date())
    .notNull(),
  role: text("role"),
  banned: boolean("banned").default(false),
  banReason: text("ban_reason"),
  banExpires: timestamp("ban_expires"),
});

export const session = pgTable(
  "session",
  {
    id: uuid("id").primaryKey(),

    expiresAt: timestamp("expires_at").notNull(),
    token: text("token").notNull().unique(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at")
      .$onUpdate(() => /* @__PURE__ */ new Date())
      .notNull(),
    ipAddress: text("ip_address"),
    userAgent: text("user_agent"),
    userId: uuid("user_id")
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
    impersonatedBy: text("impersonated_by"),
  },
  (table) => [index("session_userId_idx").on(table.userId)],
);

export const account = pgTable(
  "account",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    accountId: text("account_id").notNull(),
    providerId: text("provider_id").notNull(),
    userId: uuid("user_id")
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
    accessToken: text("access_token"),
    refreshToken: text("refresh_token"),
    idToken: text("id_token"),
    accessTokenExpiresAt: timestamp("access_token_expires_at"),
    refreshTokenExpiresAt: timestamp("refresh_token_expires_at"),
    scope: text("scope"),
    password: text("password"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at")
      .$onUpdate(() => /* @__PURE__ */ new Date())
      .notNull(),
  },
  (table) => [index("account_userId_idx").on(table.userId)],
);

export const verification = pgTable(
  "verification",
  {
    id: uuid("id").primaryKey(),
    identifier: text("identifier").notNull(),
    value: text("value").notNull(),
    expiresAt: timestamp("expires_at").notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at")
      .defaultNow()
      .$onUpdate(() => /* @__PURE__ */ new Date())
      .notNull(),
  },
  (table) => [index("verification_identifier_idx").on(table.identifier)],
);

//MAIN

export const workspace = pgTable("workspace", {
  id: uuid("id").primaryKey().defaultRandom().notNull(),
  name: text("name").notNull(),
  description: text("description"),
  userId: uuid("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),

  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const workspaceMember = pgTable(
  "workspace_member",
  {
    workspaceId: uuid("workspace_id")
      .notNull()
      .references(() => workspace.id, { onDelete: "cascade" }),
    userId: uuid("user_id")
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
    role: text("role").default("member").notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
  },
  (table) => [
    primaryKey({ columns: [table.workspaceId, table.userId] }),

    index("workspace_member_workspaceId_idx").on(table.workspaceId),
    index("workspace_member_userId_idx").on(table.userId),
  ],
);

export const statusEnum = pgEnum("status", ["OPEN", "RESOLVING", "CLOSED"]);
export const sentimentEnum = pgEnum("sentiment", [
  "POSITIVE",
  "NEUTRAL",
  "NEGATIVE",
]);

export const ticket = pgTable("ticket", {
  id: uuid("id").primaryKey().defaultRandom().notNull(),
  workspaceId: uuid("workspace_id")
    .notNull()
    .references(() => workspace.id, { onDelete: "cascade" }),

  customerEmail: text("customer_email").notNull(),
  subject: text("subject").notNull(),

  status: statusEnum("status").default("OPEN").notNull(),
  sentiment: sentimentEnum("sentiment").default("NEUTRAL").notNull(),

  urgencyScore: integer("urgency_score").default(0).notNull(),

  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const ticket_draft = pgTable("ticket_draft", {
  id: uuid("id").primaryKey().defaultRandom().notNull(),
  ticketId: uuid("ticket_id")
    .notNull()
    .references(() => ticket.id, { onDelete: "cascade" }),

  geminiDraftContent: jsonb("gemini_draft_content").notNull(),
  confidenceScore: integer("confidence_score").default(0).notNull(),

  createdAt: timestamp("created_at").defaultNow().notNull(),
});
