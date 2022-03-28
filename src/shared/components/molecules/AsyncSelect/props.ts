import React from 'react';
import type { SelectProps } from '@mantine/core';
import type { UseFormSetValue } from 'react-hook-form';

export type AsyncSelectProps<FormFields extends Record<string, any>> = Partial<
  SelectProps & React.RefAttributes<HTMLInputElement>
> & {
  setValue: UseFormSetValue<FormFields>;
  queryKey: string;
  endpoint?: string; // defaults to queryKey
};
