import { useAuth } from 'app/providers';
import { api } from 'entities/Position/api';
import { Position } from 'entities/Position/types';
import { useMutation, useQueryClient } from 'react-query';

export function useCreatePosition() {
  const { token } = useAuth();
  const queryClient = useQueryClient();

  const mutation = useMutation(
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
        return typeof recover === 'function' ? recover() : null;
      },
    }
  );

  return mutation;
}
