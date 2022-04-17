import React from 'react';

import { Select } from '@mantine/core';
import { useQuery } from 'react-query';
import { api } from 'shared/helpers';
import type { Position } from 'entities/Position/types';
import { useTranslation } from 'react-i18next';
import { useCreateElement } from './hooks';
import type { Props } from './props';

export function SelectPosition<T extends { position: string }>({ error, setValue, ...props }: Props<T>): JSX.Element {
  const { data } = useQuery('positions', api.getEntities<Position>('positions'));

  // @ts-ignore
  const mutation = useCreateElement('positions', 'positions', () => setValue?.('position', ''));
  const { t } = useTranslation();
  return (
    <Select
      label={t('Select position')}
      data={data?.map((position) => position.name) ?? []}
      placeholder="Position name"
      nothingFound="Nothing found"
      searchable
      creatable
      clearable
      getCreateLabel={(query) => `+ Create ${query}`}
      onCreate={(query) => mutation.mutate(query)}
      error={error ?? mutation.error?.message}
      {...props}
    />
  );
}
