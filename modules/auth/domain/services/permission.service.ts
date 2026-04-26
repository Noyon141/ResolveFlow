import { UserRole } from "../enums/role.enum";

export class PermissionService {
  static canManageWorkspace(role: UserRole): boolean {
    return role === UserRole.ADMIN;
  }

  static canReplyToTickets(role: UserRole): boolean {
    return role === UserRole.ADMIN || role === UserRole.AGENT;
  }
}
