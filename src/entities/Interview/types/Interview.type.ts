import { Candidate } from 'entities/Candidate';
import { Employee } from 'entities/Employee';

export type Interview = {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  date: Date;
  start: Date;
  end: Date;
  location: string;
  interviewee: Candidate;
  interviewer: Employee;
  name: string;
  status: InterivewStatus;
  statusText: string;
  datetime: string;
};

export enum InterivewStatus {
  NOT_STARTED = 'NOT_STARTED',
  FAILED = 'FAILED',
  PASSED = 'PASSED',
}

export type InterviewNIO = {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  date: Date;
  start: Date;
  end: Date;
  location: string;
  interviewee: Candidate;
  interviewer: Employee;
  name: string;
  status: InterivewStatus;
};
