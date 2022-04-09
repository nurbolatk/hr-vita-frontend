import { User } from 'entities/Session';

export type Notification = {
  id: number;
  createdAt: Date;
  updatedAt: Date;

  title: string;
  content: string;
  unread: boolean;

  receiver: User;
};
