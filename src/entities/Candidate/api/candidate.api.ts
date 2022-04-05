import { client } from 'shared/helpers';
import { Candidate, NewCandidateDTO } from '../types';

export const createEntity = async (data: NewCandidateDTO, token: string) => {
  return client<Candidate>('candidate', { data, token });
};

export const getAll = async () => {
  return client<Candidate[]>('candidate');
};

export const getOneById = (id: number) => async () => {
  return client<Candidate>(`candidate/${id}`);
};
