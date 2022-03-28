import { client } from 'shared/helpers';
import { NewCandidateFields, Entity } from '../types';

export const createEntity = async (data: NewCandidateFields) => {
  return client<Entity>('candidate', { data });
};
