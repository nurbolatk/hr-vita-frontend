import { client } from 'shared/helpers';
import { Employee } from '../types';

// export const createEntity = async (dto: CreateEntityDto) => {
//   return client<Employee>('', { data: dto });
// };

export const getAll = async () => {
  return client<Employee[]>('users');
};
