import { useMutation, useQueryClient } from 'react-query';
import { useAuth } from 'app/providers';
import type { GeneralError } from 'shared/types';
import { api } from 'shared/helpers';
import type { CreateDepartmentDto, Department } from 'entities/Department/types';

export function useCreateElement(endpoint: string, queryKey: string, resetField?: () => void) {
  const { token } = useAuth();
  const queryClient = useQueryClient();

  return useMutation<Department, GeneralError, string>(
    (name: string) => {
      return api.createEntity<Department, CreateDepartmentDto>(endpoint, { name }, token);
    },
    {
      onMutate(newDepartmentName: string) {
        const previousItems = queryClient.getQueryData<Department[]>(queryKey);
        queryClient.setQueryData<Department[]>(queryKey, (old) => {
          if (!old) return [];
          return [
            ...old,
            {
              id: Date.now(),
              createdAt: new Date(),
              updatedAt: new Date(),
              name: newDepartmentName,
            } as Department,
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
