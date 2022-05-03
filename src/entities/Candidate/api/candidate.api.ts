import { client } from 'shared/helpers';
import { parseCandidateStatus, parseCandidateStatusLabel } from 'entities/Candidate/helpers';
import { Candidate, CandidateResponse, CandidateStatus, CreateCandidateDTO, UpdateCandidateData } from '../types';

export const createCandidate = async (data: CreateCandidateDTO, token: string) => {
  return client<Candidate>('candidate', { data, token });
};

export const getAll = async (): Promise<Candidate[]> => {
  const raw = await client<CandidateResponse[]>('candidate');

  return raw.map((candidate) => {
    const status: CandidateStatus = parseCandidateStatus(candidate);

    return {
      ...candidate,
      status,
      statusLabel: parseCandidateStatusLabel(status),
    };
  });
};

export const getOneById = (id: number) => async (): Promise<Candidate> => {
  const raw = await client<CandidateResponse>(`candidate/${id}`);
  const status: CandidateStatus = parseCandidateStatus(raw);
  return {
    ...raw,
    status,
    statusLabel: parseCandidateStatusLabel(status),
  };
};

export const updateCandidateForm = async (id: number, data: UpdateCandidateData, token: string) => {
  return client<Candidate>(`candidate/${id}`, {
    method: 'PUT',
    data,
    token,
  });
};

export const updateCandidateStatus = async (id: number, data: { status: CandidateStatus }, token: string) => {
  return client<Candidate>(`candidate/${id}/status`, {
    method: 'PUT',
    data,
    token,
  });
};
