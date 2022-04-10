import { client } from 'shared/helpers';
import { CreateEmployeeDTO, Employee } from '../types';

export const createEmployee = async (dto: CreateEmployeeDTO) => {
  return client<Employee>('users', { data: dto });
};

export const getAll = async () => {
  return client<Employee[]>('users');
};
