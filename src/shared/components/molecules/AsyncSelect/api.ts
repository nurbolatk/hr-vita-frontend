import { client } from 'shared/helpers';
import type { CreateEntityDto } from './types';

export const createEntity = async <TData>(endpoint: string, dto: CreateEntityDto, token: string) => {
  return client<TData>(endpoint, { data: dto, token });
};

export const getEntities =
  <TData>(endpoint: string) =>
  async () => {
    return client<TData[]>(endpoint);
  };
