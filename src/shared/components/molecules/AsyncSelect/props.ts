import { SelectProps } from '@mantine/core';
import React from 'react';
import { UseFormSetValue } from 'react-hook-form';
import { NewCandidateFields } from 'entities/Candidate';

export type AsyncSelectProps = Partial<SelectProps & React.RefAttributes<HTMLInputElement>> & {
  setValue: UseFormSetValue<NewCandidateFields>;
  queryKey: string;
  endpoint?: string; // defaults to queryKey
};
