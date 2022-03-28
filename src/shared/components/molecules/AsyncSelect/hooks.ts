import { useMutation, useQueryClient } from 'react-query';
import { useAuth } from 'app/providers';
import type { GeneralError } from 'shared/types';
import { createEntity } from './api';
import type { Entity } from './types';

export function useCreateElement<TData extends Entity>(endpoint: string, queryKey: string, resetField?: () => void) {
  const { token } = useAuth();
  const queryClient = useQueryClient();

  return useMutation<TData, GeneralError, string>(
    (name: string) => {
      return createEntity(endpoint, { name }, token);
    },
    {
      onMutate(newPositionName: string) {
        const previousItems = queryClient.getQueryData<TData[]>(queryKey);
        queryClient.setQueryData<TData[]>(queryKey, (old) => {
          if (!old) return [];
          return [
            ...old,
            {
              id: Date.now(),
              createdAt: new Date(),
              updatedAt: new Date(),
              name: newPositionName,
            } as TData,
          ];
        });
        return () => queryClient.setQueriesData(queryKey, previousItems);
      },
      onSuccess() {
        queryClient.invalidateQueries(queryKey);
      },
      onError(err, variables, recover) {
        resetField?.();
        return typeof recover === 'function' ? recover() : null;
      },
    }
  );
}
