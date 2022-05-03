import { client } from 'shared/helpers';
import { Approval, CreateApprovalDTO, UpdateApprovalDTO } from '../types';

export const getAll = async (id: number) => {
  return client<Approval[]>(`approvals/candidate/${id}`);
};

export const getOneById = async (id: number): Promise<Approval> => {
  return client<Approval>(`approvals/${id}`);
};

export const deleteOne = async (id: number): Promise<Approval> => {
  return client<Approval>(`approvals/${id}`, {
    method: 'DELETE',
  });
};

export const update = async (body: UpdateApprovalDTO) => {
  const { id, ...data } = body;
  return client<Approval>(`approvals/${id}`, {
    data,
    method: 'PUT',
  });
};

export const createOne = async (body: CreateApprovalDTO) => {
  return client<Approval>('approvals/one', {
    data: body,
  });
};
