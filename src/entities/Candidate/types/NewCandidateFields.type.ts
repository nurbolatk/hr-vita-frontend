import { UserDocument } from 'entities/Files';
import { CreateInterviewDto, InterviewState } from 'entities/Interview';

export type CandidateFormFields = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  salary: string;
  location: string;
  position: string;
  department: string;
};

export type CreateCandidateDTO = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string | null;
  salary: number | null;
  location: string | null;
  position: string;
  department: string;
  documents: number[] | null;
};

export type DefaultCandidateFields = {
  form: CandidateFormFields;
  documents: UserDocument[];
  // interviews: InterviewState[];
};

export type UpdateCandidateDTO = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string | null;
  salary: number | null;
  location: string | null;
  position: string | null;
  department: string | null;
};

export type UpdateCandidateData = {
  form?: UpdateCandidateDTO;
  interviews?: CreateInterviewDto[] | null;
  documents?: number[];
};
