import { api } from 'entities/Employee/api';
import React, { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import Select, { OnChangeValue, OptionProps } from 'react-select';
import cn from 'classnames';
import type { Employee } from '../../types';

function Option({
  data /** Whether the option is disabled. */,
  isDisabled,
  /** Whether the option is focused. */
  isFocused,
  innerRef,
  innerProps,
}: OptionProps<Employee, false>) {
  if (isDisabled) return null;
  return (
    <div
      ref={innerRef}
      {...innerProps}
      className={cn('p-2.5 rounded text-sm transition-colors', {
        'bg-stone-100': isFocused,
      })}>
      <p>{data.fullName}</p>
      <p className="text-xs text-stone-400">{data.position.name}</p>
    </div>
  );
}

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
      components={{
        Option,
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
