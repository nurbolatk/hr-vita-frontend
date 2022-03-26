import { User } from './User.type';

export type Session = {
  token: string;
  user: User;
};
