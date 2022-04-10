import { Employee, EmployeeFormFields } from '..';

export function employeeToForm(employee: Employee): EmployeeFormFields {
  return {
    email: employee.email,
    firstName: employee.firstName,
    lastName: employee.lastName,
    salary: String(employee.salary ?? ''),
    phone: employee.phone ?? '',
    location: employee.location ?? '',
    position: employee.position.name,
    department: employee.department.name,
    role: employee.role,
    status: employee.status,
  };
}
