import React from 'react';
import type { SelectProps } from '@mantine/core';
import type { UseFormSetValue } from 'react-hook-form';

export type Props<T extends { position: string }> = Partial<SelectProps & React.RefAttributes<HTMLInputElement>> & {
  setValue?: UseFormSetValue<T>;
};
