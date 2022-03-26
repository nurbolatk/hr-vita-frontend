import { User } from 'types';

export type Session = {
  token: string;
  user: User;
};
