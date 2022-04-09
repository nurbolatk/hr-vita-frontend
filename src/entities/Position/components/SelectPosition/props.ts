import { CandidateFormFields } from 'entities/Candidate';
import React from 'react';
import type { SelectProps } from '@mantine/core';
import type { UseFormSetValue } from 'react-hook-form';

export type Props = Partial<SelectProps & React.RefAttributes<HTMLInputElement>> & {
  setValue: UseFormSetValue<CandidateFormFields>;
};
