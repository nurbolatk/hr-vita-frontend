import { client } from 'shared/helpers';
import { NewCandidateFields, Entity } from '../types';

export const createEntity = async (data: NewCandidateFields, token: string) => {
  return client<Entity>('candidate', { data, token });
};

export const getAll = async () => {
  return client<Entity[]>('candidate');
};
