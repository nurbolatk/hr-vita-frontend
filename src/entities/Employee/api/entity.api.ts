import { client } from 'shared/helpers';
import { CreateEmployeeDTO, Employee } from '../types';

export const createEmployee = async (dto: CreateEmployeeDTO) => {
  return client<Employee>('users', { data: dto });
};

export const updateEmployee = async (id: number, dto: CreateEmployeeDTO) => {
  return client<Employee>(`users/${id}`, { data: dto, method: 'PUT' });
};

export const getAll = async () => {
  return client<Employee[]>('users');
};

export const getOneById = async (id: number) => {
  return client<Employee>(`users/${id}`);
};
