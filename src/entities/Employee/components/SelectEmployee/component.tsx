import { api } from 'entities/Employee/api';
import React, { useState } from 'react';
import { useQuery } from 'react-query';
import Select, { ActionMeta, OnChangeValue } from 'react-select';
import type { Employee } from '../../types';

const options: Employee[] = [
  {
    id: 1,
    firstName: 'Aloha',
    lastName: 'Dev',
    email: 'curious@dev.com',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

// const filterOptions = (candidate: { label: string; value: string; data: any }, input: string) => {
//   if (input) {
//     return candidate.value === customOptions[0].value;
//   }
//   return true;
// };

export function SelectEmployee({ onChange }: { onChange: (value: Employee | null) => void }): JSX.Element {
  const { isLoading } = useQuery<Employee[]>('employees', api.getAll);

  const [value, setValue] = useState<Employee | null | undefined>();

  const handleChange = (newValue: OnChangeValue<Employee, false>, actionMeta: ActionMeta<Employee>) => {
    console.group('Value Changed');
    console.log(newValue);
    console.log(`action: ${actionMeta.action}`);
    console.groupEnd();
    setValue(newValue);
    onChange(newValue);
  };

  return (
    <Select<Employee, false>
      className="w-full"
      isClearable
      isDisabled={isLoading}
      isLoading={isLoading}
      onChange={handleChange}
      getOptionLabel={(option) => `${option.firstName} ${option.lastName}`}
      options={options}
      value={value}
    />
  );
}
