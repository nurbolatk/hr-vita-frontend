import { Employee, EmployeeResponse } from '..';

export function responseToEmployee(raw: EmployeeResponse): Employee {
  return {
    ...raw,
    supervisor: raw.supervisor ? responseToEmployee(raw.supervisor) : null,
    fullName: `${raw.firstName} ${raw.lastName}`,
  };
}
