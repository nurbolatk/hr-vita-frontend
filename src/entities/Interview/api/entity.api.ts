import { client } from 'shared/helpers';
import { CreateEntityDto, Entity } from '../types';

export const createEntity = async (dto: CreateEntityDto) => {
  return client<Entity>('entities', { data: dto });
};

export const getAll = async () => {
  return client<Entity[]>('entities');
};
