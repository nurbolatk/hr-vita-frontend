import { Select } from '@mantine/core';
import { api } from 'entities/Position/api';
import { useCreatePosition } from 'entities/Position/hooks';
import { Position } from 'entities/Position/types';
import React from 'react';
import { useQuery } from 'react-query';

export function PositionsSelect(): JSX.Element {
  const { data } = useQuery<Position[]>('positions', api.getPositions);

  const mutation = useCreatePosition();

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
    />
  );
}
