import React from 'react';
import type { AsyncSelectProps } from 'shared/components/molecules';
import { AsyncSelect } from 'shared/components/molecules';
import { Position } from 'entities/Position/types';
import { NewCandidateFields } from 'entities/Candidate';

export function PositionsSelect(props: Omit<AsyncSelectProps<NewCandidateFields>, 'queryKey'>): JSX.Element {
  return <AsyncSelect<Position> queryKey="positions" {...props} />;
}
