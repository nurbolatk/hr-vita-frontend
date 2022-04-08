import { Candidate } from 'entities/Candidate';
import { Employee } from 'entities/Employee';

export type Interview = {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  datetime: Date;
  location: string;
  interviewee: Candidate;
  interviewer: Employee;
};
