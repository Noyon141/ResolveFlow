import { relations } from "drizzle-orm";
import {
  account,
  session,
  ticket,
  ticket_draft,
  user,
  workspace,
  workspaceMember,
} from "./schema";

export const userRelations = relations(user, ({ many }) => ({
  sessions: many(session),
  accounts: many(account),
  ownedWorkspaces: many(workspace),
  workspaceMemberships: many(workspaceMember),
}));

export const sessionRelations = relations(session, ({ one }) => ({
  user: one(user, {
    fields: [session.userId],
    references: [user.id],
  }),
}));

export const accountRelations = relations(account, ({ one }) => ({
  user: one(user, {
    fields: [account.userId],
    references: [user.id],
  }),
}));

export const workspaceRelations = relations(workspace, ({ one, many }) => ({
  owner: one(user, {
    fields: [workspace.userId],
    references: [user.id],
  }),
  members: many(workspaceMember),
  tickets: many(ticket),
}));

export const workspaceMemberRelations = relations(
  workspaceMember,
  ({ one }) => ({
    workspace: one(workspace, {
      fields: [workspaceMember.workspaceId],
      references: [workspace.id],
    }),
    user: one(user, {
      fields: [workspaceMember.userId],
      references: [user.id],
    }),
  }),
);

export const ticketRelations = relations(ticket, ({ one }) => ({
  workspace: one(workspace, {
    fields: [ticket.workspaceId],
    references: [workspace.id],
  }),
  draft: one(ticket_draft, {
    fields: [ticket.id],
    references: [ticket_draft.ticketId],
  }),
}));

export const ticketDraftRelations = relations(ticket_draft, ({ one }) => ({
  ticket: one(ticket, {
    fields: [ticket_draft.ticketId],
    references: [ticket.id],
  }),
}));
