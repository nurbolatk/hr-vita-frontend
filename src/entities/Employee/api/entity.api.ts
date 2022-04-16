import { client } from 'shared/helpers';
import { responseToEmployee } from 'entities/Employee/helpers';
import { CreateEmployeeDTO, Employee, EmployeeResponse } from '../types';

export const createEmployee = async (dto: CreateEmployeeDTO): Promise<Employee> => {
  const response = await client<EmployeeResponse>('users', { data: dto });
  return responseToEmployee(response);
};

export const updateEmployee = async (id: number, dto: CreateEmployeeDTO): Promise<Employee> => {
  const response = await client<EmployeeResponse>(`users/${id}`, { data: dto, method: 'PUT' });
  return responseToEmployee(response);
};

export const getAll = async (): Promise<Employee[]> => {
  const response = await client<EmployeeResponse[]>('users');
  return response.map((res) => responseToEmployee(res));
};

export const getOneById = async (id: number): Promise<Employee> => {
  const response = await client<EmployeeResponse>(`users/${id}`);
  return responseToEmployee(response);
};

export const searchEmployee = async (name: string) => {
  const queryParams = new URLSearchParams({
    query: name,
  });
  const response = await client<EmployeeResponse[]>('users/search', {
    queryParams,
  });
  return response.map((res) => responseToEmployee(res));
};
