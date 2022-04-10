import { client } from 'shared/helpers';
import { Candidate, CreateCandidateDTO, UpdateCandidateData } from '../types';

export const createCandidate = async (data: CreateCandidateDTO, token: string) => {
  return client<Candidate>('candidate', { data, token });
};

export const getAll = async () => {
  return client<Candidate[]>('candidate');
};

export const getOneById = (id: number) => async () => {
  return client<Candidate>(`candidate/${id}`);
};

export const updateCandidateForm = async (id: number, data: UpdateCandidateData, token: string) => {
  return client<Candidate>(`candidate/${id}`, {
    method: 'PUT',
    data,
    token,
  });
};
