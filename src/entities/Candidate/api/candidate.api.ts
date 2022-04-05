import { client } from 'shared/helpers';
import { NewCandidateFields, Candidate } from '../types';

export const createEntity = async (data: NewCandidateFields, token: string) => {
  return client<Candidate>('candidate', { data, token });
};

export const getAll = async () => {
  return client<Candidate[]>('candidate');
};
