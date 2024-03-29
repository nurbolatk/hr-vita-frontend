import { client } from 'shared/helpers';
import { Notification } from '../types';

export const getAll = async (token: string) => {
  return client<Notification[]>('notifications', { token });
};

export const updateNotification = async (id: number) => {
  return client<Notification>(`notifications/${id}`, {
    method: 'PUT',
  });
};
