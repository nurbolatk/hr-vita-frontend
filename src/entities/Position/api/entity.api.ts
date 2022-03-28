import { client } from 'shared/helpers';
import { CreateEntityDto, Position } from '../types';

export const createEntity = async (dto: CreateEntityDto, token: string) => {
  return client<Position>('positions', { data: dto, token });
};

export const getPositions = async () => {
  return client<Position[]>('positions');
};
