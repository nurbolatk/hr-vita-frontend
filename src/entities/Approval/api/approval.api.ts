import { client } from 'shared/helpers';
import { Approval, UpdateApprovalDTO } from '../types';

export const getAll = async (id: number) => {
  return client<Approval[]>(`approvals/candidate/${id}`);
};

export const getOneById = async (id: number): Promise<Approval> => {
  return client<Approval>(`approvals/${id}`);
};

export const update = async (body: UpdateApprovalDTO) => {
  const { id, ...data } = body;
  return client<Approval>(`approvals/${id}`, {
    data,
    method: 'PUT',
  });
};
