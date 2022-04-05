import React from 'react';

import { Select } from '@mantine/core';
import { useQuery } from 'react-query';
import { api } from 'shared/helpers';
import type { Department } from '../../types';
import { useCreateElement } from './hooks';
import type { Props } from './props';

export function SelectDepartment({ error, setValue, ...props }: Props): JSX.Element {
  const { data } = useQuery('departments', api.getEntities<Department>('departments'));

  const mutation = useCreateElement('departments', 'departments', () => setValue?.('department', ''));

  return (
    <Select
      label="Выберите отделение"
      data={data?.map((department) => department.name) ?? []}
      placeholder="Название отделения"
      nothingFound="Ничего не найдено"
      searchable
      creatable
      getCreateLabel={(query) => `+ Create ${query}`}
      onCreate={(query) => mutation.mutate(query)}
      error={error ?? mutation.error?.message}
      {...props}
    />
  );
}