import { Department } from 'entities/Department/types';
import { UserDocument } from 'entities/Files';
import { Interview } from 'entities/Interview';
import { Position } from 'entities/Position/types';

export type CandidateResponse = {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  firstName: string;
  lastName: string;
  email: string;
  phone: string | null;
  salary: number | null;
  location: string | null;
  status: CandidateStatus;
  department: Department;
  position: Position;
  interviews: Interview[];
  documents: UserDocument[];
};
export type Candidate = {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  firstName: string;
  lastName: string;
  email: string;
  phone: string | null;
  salary: number | null;
  location: string | null;
  status: CandidateStatus;
  statusLabel: string;
  department: Department;
  position: Position;
  interviews: Interview[];
  documents: UserDocument[];
};

export enum CandidateStatus {
  NOT_STARTED = 'NOT_STARTED',
  ONGOING = 'ONGOING',
  FAILED = 'FAILED',
  HIRED = 'HIRED',
}
