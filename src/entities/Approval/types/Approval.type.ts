import { Department } from 'entities/Department/types';
import { Employee } from 'entities/Employee';

export type Approval = {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  department: Department;
  master: Employee | null;
  candidate: Employee;
  status: ApprovalStatus;
};

export enum ApprovalStatus {
  PENDING = 'PENDING',
  APPROVED = 'APPROVED',
  REJECTED = 'REJECTED',
}
