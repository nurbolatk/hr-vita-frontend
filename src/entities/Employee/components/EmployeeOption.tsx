import React from 'react';
import cn from 'classnames';
import { OptionProps } from 'react-select';
import { Employee } from '../types';

export function EmployeeOption({
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
