import { UserDocument } from 'entities/Files';
import { Role } from 'entities/Session';
import { Employee, EmployeeStatus } from './Employee.type';

export type EmployeeFormFields = {
  email: string;
  firstName: string;
  lastName: string;
  salary: string;
  phone: string;
  location: string;
  department: string;
  position: string;
  role: Role;
  status: EmployeeStatus;
};

export type CreateEmployeeDTO = {
  email: string;
  firstName: string;
  lastName: string;
  salary: number;
  phone: string | null;
  location: string | null;
  department: string;
  position: string;
  supervisorId: number;
  role: Role;
  status: EmployeeStatus;
  documents: number[];
};

export type DefaultEmployeeFields = {
  form: EmployeeFormFields;
  supervisor: Employee | null;
  documents: UserDocument[];
};
