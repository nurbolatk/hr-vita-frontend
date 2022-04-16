/* eslint-disable jsx-a11y/label-has-associated-control */
import { CloseButton, Input, Loader, Paper } from '@mantine/core';
import cn from 'classnames';
import { useCombobox } from 'downshift';
import { api, Employee } from 'entities/Employee';
import React, { useState } from 'react';
import { useQuery } from 'react-query';
import { useNavigate } from 'react-router-dom';

export function SearchEmployees(): JSX.Element {
  const [query, setQuery] = useState<string>('');
  const { data, isLoading } = useQuery<Employee[]>(['employees', query], () => api.searchEmployee(query), {
    enabled: !!query,
  });

  const navigate = useNavigate();

  const items: Employee[] = data ?? [];

  const {
    isOpen,
    getMenuProps,
    getInputProps,
    getComboboxProps,
    highlightedIndex,
    getItemProps,
    closeMenu,
    inputValue,
    setInputValue,
  } = useCombobox<Employee>({
    items,
    itemToString: (item) => (item ? item.fullName : ''),
    onInputValueChange: ({ inputValue: newValue }) => {
      setQuery(newValue?.replace(/\s/g, '') ?? '');
    },
    onSelectedItemChange: (changes) => {
      if (changes.selectedItem) {
        navigate(`/profile/${changes.selectedItem.id}`);
      }
    },
  });

  const handleClose = () => {
    setInputValue('');
    closeMenu();
  };

  return (
    <div>
      <div {...getComboboxProps()}>
        <Input
          {...getInputProps()}
          placeholder="Search employees"
          rightSection={
            isLoading ? (
              <Loader size="xs" color="gray" />
            ) : (
              inputValue.length > 0 && <CloseButton onClick={handleClose} />
            )
          }
        />
      </div>
      <div {...getMenuProps()} className="relative">
        {isOpen && (
          <Paper shadow="sm" p="xs" withBorder className="z-20 text-sm top-2 absolute inset-x-0">
            {items.map((employee, index) => (
              <div
                className={cn('block p-2.5 rounded transition-colors', {
                  'bg-stone-100': highlightedIndex === index,
                })}
                {...getItemProps({
                  item: employee,
                  index,
                })}>
                <p>{employee.fullName}</p>
                <p className="text-xs text-stone-400">{employee.position.name}</p>
              </div>
            ))}
            {!query && <p>Start typing name...</p>}
            {query && items.length === 0 && <p>No results</p>}
          </Paper>
        )}
      </div>
    </div>
  );
}
