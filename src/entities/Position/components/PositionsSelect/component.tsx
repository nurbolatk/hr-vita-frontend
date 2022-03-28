import React from 'react';
import type { AsyncSelectProps } from 'shared/components/molecules';
import { AsyncSelect } from 'shared/components/molecules';
import { Position } from 'entities/Position/types';

export function PositionsSelect(props: Omit<AsyncSelectProps, 'queryKey'>): JSX.Element {
  return <AsyncSelect<Position> queryKey="positions" {...props} />;
}
