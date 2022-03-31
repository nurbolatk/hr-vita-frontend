import { client } from 'shared/helpers';
import { NewCandidateFields, Entity, UserDocument } from '../types';

export const createEntity = async (data: NewCandidateFields, token: string) => {
  return client<Entity>('candidate', { data, token });
};

export const uploadDocuments = async (data: FormData, token: string) => {
  const res = await window.fetch(`${process.env.REACT_APP_BACKEND_URL}/documents/upload`, {
    body: data,
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const result: UserDocument = await res.json();
  return result;
};
