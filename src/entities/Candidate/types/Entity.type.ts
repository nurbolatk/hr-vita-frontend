import { Department } from 'entities/Department/types';
import { Position } from 'entities/Position/types';

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
  department: Department;
  position: Position;
};

export enum CandidateStatus {
  NOT_STARTED = 'NOT_STARTED',
  ONGOING = 'ONGOING',
  FAILED = 'FAILED',
  HIRED = 'HIRED',
}
