import { Select } from '@mantine/core';
import React from 'react';
import { useQuery } from 'react-query';
import { useCreatePosition } from './hooks';
import * as api from './api';
import { Entity } from './types/Entity.type';
import { AsyncSelectProps } from './props';

export function AsyncSelect<TData extends Entity>({
  error,
  setValue,
  queryKey,
  endpoint = queryKey,
  ...props
}: AsyncSelectProps): JSX.Element {
  const { data } = useQuery<TData[]>(queryKey, api.getEntities<TData>(endpoint));

  const mutation = useCreatePosition(endpoint, queryKey, () => setValue?.('position', ''));

  return (
    <Select
      label="Creatable Select"
      data={data?.map((position) => position.name) ?? []}
      placeholder="Select items"
      nothingFound="Nothing found"
      searchable
      creatable
      getCreateLabel={(query) => `+ Create ${query}`}
      onCreate={(query) => mutation.mutate(query)}
      error={error ?? mutation.error?.message}
      {...props}
    />
  );
}
