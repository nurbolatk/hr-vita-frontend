import { api } from 'entities/Employee/api';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useQuery } from 'react-query';
import Select, { OnChangeValue } from 'react-select';
import type { Employee } from '../../types';
import { EmployeeOption } from '../EmployeeOption';

export function SelectEmployee({
  onChange,
  defaultValue,
}: {
  onChange?: (value: Employee | null) => void;
  defaultValue?: number | null;
}): JSX.Element {
  const { data, isLoading } = useQuery<Employee[]>('employees', api.getAll);
  const { t } = useTranslation();
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
      placeholder={t('Select...')}
      isDisabled={isLoading}
      isLoading={isLoading}
      onChange={handleChange}
      getOptionLabel={(option) => `${option.firstName} ${option.lastName}`}
      options={data}
      value={value}
      components={{
        Option: EmployeeOption,
      }}
      styles={{
        container: (base) => ({
          ...base,
          fontSize: '0.9rem',
          padding: '0',
        }),
        menu: (base) => ({
          ...base,
          padding: '0',
          width: 'max-content',
          minWidth: '100%',
        }),
        menuList: (base) => ({
          ...base,
          padding: '5px',
        }),
      }}
      theme={(theme) => ({
        ...theme,
        colors: {
          ...theme.colors,
          primary: '#20C997',
        },
      })}
    />
  );
}
