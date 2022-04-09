import { QueryClient, useMutation, useQueryClient } from 'react-query';
import { useModalState } from 'shared/components/organisms/Modal/context';
import { useIdParam } from 'shared/hooks';
import { api } from '../api';
import { CreateInterviewNOO, UpdateInterviewNOO } from '../types';

const onSuccessHandler = (client: QueryClient, candidateId: number, cb?: () => void) => {
  client.invalidateQueries(['interviews', candidateId]);
  cb?.();
};

export function useInterviewQueries() {
  const candidateId = useIdParam();
  const { closeModal } = useModalState();
  const queryClient = useQueryClient();

  const creation = useMutation((data: CreateInterviewNOO) => api.createInterview(data), {
    onSuccess: () => {
      onSuccessHandler(queryClient, candidateId, closeModal);
    },
  });
  const updating = useMutation((data: UpdateInterviewNOO) => api.updateInterview(data), {
    onSuccess: () => {
      onSuccessHandler(queryClient, candidateId, closeModal);
    },
  });

  return { creation, updating };
}
