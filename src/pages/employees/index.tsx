import { Button, Card, LoadingOverlay, Table, Title } from '@mantine/core';
import { api, Employee } from 'entities/Employee';
import { parseEmployeeStatus } from 'entities/Employee/helpers';
import React from 'react';
import { useQuery } from 'react-query';
import { Link } from 'react-router-dom';

export function EmployeesIndexRoute() {
  const { data: employees, isLoading } = useQuery<Employee[]>('employees', api.getAll);

  const rows = employees?.map((employee: Employee) => {
    return (
      <tr key={employee.id}>
        <td>
          <Link className="block" to={`/employees/${employee.id}`}>
            {employee.firstName} {employee.lastName}
          </Link>
        </td>
        <td>
          <Link className="block" to={`/employees/${employee.id}`}>
            {employee.position.name}
          </Link>
        </td>
        <td>
          <Link className="block" to={`/employees/${employee.id}`}>
            {employee.department.name}
          </Link>
        </td>
        <td>
          <Link className="block" to={`/employees/${employee.supervisor?.id}`}>
            {employee.supervisor?.firstName} {employee.supervisor?.lastName}
          </Link>
        </td>
        <td>
          <Link className="block" to={`/employees/${employee.id}`}>
            {employee.salary}
          </Link>
        </td>
        <td>
          <Link className="block" to={`/employees/${employee.id}`}>
            {parseEmployeeStatus(employee)}
          </Link>
        </td>
      </tr>
    );
  });

  return (
    <div>
      <div className="flex items-center gap-x-4 mb-6">
        <Title order={2}>Employees</Title>
        <Button<typeof Link> component={Link} to="/employees/new">
          Add employee
        </Button>
      </div>
      <Card withBorder shadow="sm" className="relative p-0">
        <LoadingOverlay visible={isLoading} />
        <Table highlightOnHover verticalSpacing={16} horizontalSpacing={16}>
          <thead>
            <tr>
              <th>Name</th>
              <th>Position</th>
              <th>Department</th>
              <th>Supervisor</th>
              <th>Salary</th>
              <th>Status</th>
              {/* <th>Action</th> */}
            </tr>
          </thead>

          {!isLoading && (!rows || rows.length < 1) && <tbody>No employees</tbody>}
          {rows && <tbody>{rows}</tbody>}
        </Table>
      </Card>
    </div>
  );

  return <div>EmployeesIndexRoute</div>;
}
