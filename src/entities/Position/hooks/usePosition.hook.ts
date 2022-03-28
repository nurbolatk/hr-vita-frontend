import { useAuth } from 'app/providers';
import { api } from 'entities/Position/api';
import { Position } from 'entities/Position/types';
import { useMutation, useQueryClient } from 'react-query';
import { GeneralError } from 'shared/types';

export function useCreatePosition(resetField?: () => void) {
  const { token } = useAuth();
  const queryClient = useQueryClient();

  const mutation = useMutation<Position, GeneralError, string>(
    (name: string) => {
      return api.createEntity({ name }, token);
    },
    {
      onMutate(newPositionName: string) {
        const previousItems = queryClient.getQueryData<Position[]>('positions');
        queryClient.setQueryData<Position[]>('positions', (old) => {
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
        return () => queryClient.setQueriesData('positions', previousItems);
      },
      onSuccess() {
        queryClient.invalidateQueries('positions');
      },
      onError(err, variables, recover) {
        resetField?.();
        return typeof recover === 'function' ? recover() : null;
      },
    }
  );

  return mutation;
}
