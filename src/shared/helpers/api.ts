import { client } from 'shared/helpers';

export const createEntity = async <TData, DTO>(endpoint: string, dto: DTO, token: string) => {
  return client<TData>(endpoint, { data: dto, token });
};

export const getEntities =
  <TData>(endpoint: string) =>
  async () => {
    return client<TData[]>(endpoint);
  };
