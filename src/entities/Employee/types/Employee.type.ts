import { Department } from 'entities/Department/types';
import { UserDocument } from 'entities/Files';
import { Interview } from 'entities/Interview';
import { Position } from 'entities/Position/types';
import { Role } from 'entities/Session';

export type Employee = {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  email: string;
  firstName: string;
  lastName: string;
  salary: number;
  phone: string | null;
  location: string | null;
  role: Role;
  status: EmployeeStatus;
  department: Department;
  position: Position;
  interviews: Interview[];
  documents: UserDocument[];
  supervisor: Employee | null;
};

export enum EmployeeStatus {
  NOT_ACCEPTED = 'NOT_ACCEPTED',
  WORKING = 'WORKING',
  FIRED = 'FIRED',
}
