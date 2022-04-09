import { client } from 'shared/helpers';
import { parseInterviewNIOs } from 'entities/Interview/helper';
import { CreateInterviewNOO, Interview, InterviewNIO } from '../types';

export const createInterview = async (data: CreateInterviewNOO) => {
  return client<Interview>('interview', { data });
};

export const getAll = async (candidateId: number) => {
  const interviews = await client<InterviewNIO[]>(`interviews/interviewee/${candidateId}`);
  return parseInterviewNIOs(interviews);
};
