import { Button, Card, LoadingOverlay, Table, Title } from '@mantine/core';
import { useAuth } from 'app/providers';
import { api, Employee, SearchEmployees } from 'entities/Employee';
import { parseEmployeeStatusJSX } from 'entities/Employee/helpers';
import { Role } from 'entities/Session';
import React, { useMemo } from 'react';
import { useQuery } from 'react-query';
import { Link } from 'react-router-dom';
import { CellProps, Column, useTable } from 'react-table';
import { isAllowedTo } from 'shared/helpers';

function DefaultCell({ value, row }: CellProps<Employee>): JSX.Element {
  return <Link to={`/employees/${row.original.id}`}>{value}</Link>;
}

function BadgeCell({ value, row }: CellProps<Employee>): JSX.Element {
  return <Link to={`/employees/${row.original.id}`}>{parseEmployeeStatusJSX(undefined, value)}</Link>;
}

function SupervisorCell({ value, row }: CellProps<Employee>): JSX.Element {
  if (row.original.supervisor) {
    return <Link to={`/employees/${row.original.supervisor.id}`}>{value}</Link>;
  }
  return <Link to={`/employees/${row.original.id}`}>No supervisor</Link>;
}

export function EmployeesIndexRoute() {
  const { data: employees, isLoading } = useQuery<Employee[]>('employees', api.getAll);

  const columns = useMemo<Column<Employee>[]>(
    () => [
      {
        Header: 'Full Name',
        accessor: 'fullName',
      },
      {
        Header: 'Position',
        accessor: (row) => row.position.name,
        // id: 'id',
      },
      {
        Header: 'Department',
        accessor: (row) => row.department.name,
        // // id: 'id',
      },
      {
        Header: 'Supervisor',
        accessor: (row) => row.supervisor?.fullName,
        Cell: SupervisorCell,
      },
      {
        Header: 'Salary',
        accessor: 'salary',
      },
      {
        Header: 'Status',
        accessor: 'status',
        Cell: BadgeCell,
      },
    ],
    []
  );

  const data = useMemo<Employee[]>(() => employees ?? [], [employees]);

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable({
    columns,
    data,
    defaultColumn: {
      Cell: DefaultCell,
    },
  });

  const { user } = useAuth();

  return (
    <div>
      <div className="flex items-center gap-x-4 mb-6">
        <Title order={2}>Employees</Title>
        {user && isAllowedTo(user, [Role.HR, Role.ADMIN]) && (
          <Button<typeof Link> compact component={Link} to="/employees/new">
            Add employee
          </Button>
        )}
      </div>
      <SearchEmployees />
      <Card withBorder shadow="sm" className="relative p-0 mt-6">
        <LoadingOverlay visible={isLoading} />
        <Table highlightOnHover verticalSpacing={16} horizontalSpacing={16} {...getTableProps}>
          <thead>
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <th {...column.getHeaderProps()}>{column.render('Header')}</th>
                ))}
              </tr>
            ))}
          </thead>

          {!isLoading && (!rows || rows.length < 1) && <tbody>No employees</tbody>}

          <tbody {...getTableBodyProps()}>
            {rows.map((row, i) => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()}>
                  {row.cells.map((cell) => {
                    return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>;
                  })}
                </tr>
              );
            })}
          </tbody>
        </Table>
      </Card>
    </div>
  );
}
