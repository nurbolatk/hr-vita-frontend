import { client } from 'shared/helpers';
import { parseInterviewNIOs } from 'entities/Interview/helper';
import { CreateInterviewNOO, Interview, InterviewNIO, UpdateInterviewNOO } from '../types';

export const getAll = async (candidateId: number) => {
  const interviews = await client<InterviewNIO[]>(`interviews/interviewee/${candidateId}`);
  return parseInterviewNIOs(interviews);
};

export const getOneById = async (id: number): Promise<Interview> => {
  const interview = await client<InterviewNIO>(`interviews/${id}`);
  return parseInterviewNIOs([interview])[0];
};

export const createInterview = async (data: CreateInterviewNOO) => {
  return client<Interview>('interviews', { data });
};

export const updateInterview = async (data: UpdateInterviewNOO) => {
  const { id, ...rest } = data;
  return client<Interview>(`interviews/${id}`, { data: rest, method: 'PUT' });
};

export const deleteInterview = async (id: number) => {
  return client<Interview>(`interviews/${id}`, { method: 'DELETE' });
};
