import { client } from 'shared/helpers';
import { CreateInterviewDto, Interview } from '../types';

export const createEntity = async (dto: CreateInterviewDto) => {
  return client<Interview>('entities', { data: dto });
};

export const getAll = async () => {
  return client<Interview[]>('entities');
};
