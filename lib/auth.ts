import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { admin } from "better-auth/plugins";
import { db } from "@/db";
import * as Schema from "@/db/schema";

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "pg", // or "mysql", "sqlite"
    schema: {
      ...Schema,
    },
  }),

  emailAndPassword: {
    enabled: true,
  },

  secret: process.env.BETTER_AUTH_SECRET! as string,
  baseUrl: process.env.BETTER_AUTH_URL! as string,
  advanced: {
    database: {
      generateId: () => crypto.randomUUID(),
    },
  },

  plugins: [
    admin({
      defaultRole: "admin",
    }),
  ],
});
