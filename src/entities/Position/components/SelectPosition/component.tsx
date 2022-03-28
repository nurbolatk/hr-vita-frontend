import React from 'react';

import { Select } from '@mantine/core';
import { useQuery } from 'react-query';
import { api } from 'shared/helpers';
import type { Position } from 'entities/Position/types';
import { useCreateElement } from './hooks';
import type { Props } from './props';

export function SelectPosition({ error, setValue, ...props }: Props): JSX.Element {
  const { data } = useQuery('positions', api.getEntities<Position>('positions'));

  const mutation = useCreateElement('positions', 'positions', () => setValue?.('position', ''));

  return (
    <Select
      label="Select position"
      data={data?.map((position) => position.name) ?? []}
      placeholder="Position name"
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
