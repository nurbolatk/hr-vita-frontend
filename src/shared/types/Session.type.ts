import { User } from 'shared/types';

export type Session = {
  token: string;
  user: User;
};
