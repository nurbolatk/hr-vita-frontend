import { useMutation, useQueryClient } from 'react-query';
import { useAuth } from 'app/providers';
import type { GeneralError } from 'shared/types';
import { api } from 'shared/helpers';
import type { CreatePositionDto, Position } from 'entities/Position/types';

export function useCreateElement(endpoint: string, queryKey: string, resetField?: () => void) {
  const { token } = useAuth();
  const queryClient = useQueryClient();

  return useMutation<Position, GeneralError, string>(
    (name: string) => {
      return api.createEntity<Position, CreatePositionDto>(endpoint, { name }, token);
    },
    {
      onMutate(newPositionName: string) {
        const previousItems = queryClient.getQueryData<Position[]>(queryKey);
        queryClient.setQueryData<Position[]>(queryKey, (old) => {
          if (!old) return [];
          return [
            ...old,
            {
              id: Date.now(),
              createdAt: new Date(),
              updatedAt: new Date(),
              name: newPositionName,
            } as Position,
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
