import { client } from 'shared/helpers';
import { CreateEntityDto, Interview } from '../types';

export const createEntity = async (dto: CreateEntityDto) => {
  return client<Interview>('entities', { data: dto });
};

export const getAll = async () => {
  return client<Interview[]>('entities');
};
