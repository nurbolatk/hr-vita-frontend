import { Role, User } from 'entities/Session';

export function isAllowedTo(user: User, allowed: Role[] = [], prohibited: Role[] = []): boolean {
  console.log({ user, allowed, prohibited });

  if (!allowed.includes(user.role)) return false;
  if (prohibited.includes(user.role)) return false;
  return true;
}
