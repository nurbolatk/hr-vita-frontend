import { UserResponse, User } from './User.type';

export type Session = {
  token: string;
  user: User;
};

export type SessionResponse = {
  token: string;
  user: UserResponse;
};
