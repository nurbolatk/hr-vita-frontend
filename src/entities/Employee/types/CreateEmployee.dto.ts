import { EmployeeStatus, Role } from './Employee.type';

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
  salary: string;
  phone: string | null;
  location: string | null;
  department: string;
  position: string;
  role: Role;
  status: EmployeeStatus;
};
