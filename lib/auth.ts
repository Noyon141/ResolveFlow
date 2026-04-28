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
  databaseHooks: {
    user: {
      create: {
        after: async (user) => {
          // As soon as Better Auth creates the user, provision their tenant.
          // If your business logic requires naming the workspace from a form input,
          // you can pass custom data in the signUp client call and retrieve it here via request context.

          // 1. Create the Workspace
          const [newWorkspace] = await db
            .insert(Schema.workspace)
            .values({
              name: `${user.name}'s Workspace`,
              userId: user.id,
              description: "Default workspace",
            })
            .returning();

          // 2. Assign the user as the ADMIN of this new workspace
          await db.insert(Schema.workspaceMember).values({
            workspaceId: newWorkspace.id,
            userId: user.id,
            role: "ADMIN", // Using your pgEnum
          });
        },
      },
    },
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
