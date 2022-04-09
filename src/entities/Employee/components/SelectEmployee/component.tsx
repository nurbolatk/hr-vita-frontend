import { api } from 'entities/Employee/api';
import React, { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import Select, { OnChangeValue } from 'react-select';
import type { Employee } from '../../types';

export function SelectEmployee({
  onChange,
  defaultValue,
}: {
  onChange?: (value: Employee | null) => void;
  defaultValue?: number | null;
}): JSX.Element {
  const { data, isLoading } = useQuery<Employee[]>('employees', api.getAll);

  const [value, setValue] = useState<Employee | null | undefined>();

  useEffect(() => {
    if (defaultValue !== null && defaultValue !== undefined && !!data) {
      setValue(data.find((employee) => employee.id === defaultValue));
    }
  }, [data, defaultValue]);

  const handleChange = (newValue: OnChangeValue<Employee, false>) => {
    setValue(newValue);
    onChange?.(newValue);
  };

  return (
    <Select<Employee, false>
      className="w-full"
      isClearable
      isDisabled={isLoading}
      isLoading={isLoading}
      onChange={handleChange}
      getOptionLabel={(option) => `${option.firstName} ${option.lastName}`}
      options={data}
      value={value}
    />
  );
}
