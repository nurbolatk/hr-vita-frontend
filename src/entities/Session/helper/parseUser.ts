import { User, UserResponse, Role } from '../types';

export function parseUser(user: UserResponse): User {
  return { ...user, isHR: user.role === Role.HR };
}
