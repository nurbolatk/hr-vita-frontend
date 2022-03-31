import { CreateInterviewDto } from 'entities/Interview';

export type NewCandidateFields = {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  salary?: number;
  location?: string;
  position?: string;
  department?: string;
  interviews?: CreateInterviewDto[];
  documentId?: number;
};
