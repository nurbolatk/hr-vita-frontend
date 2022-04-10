import { LoadingOverlay } from '@mantine/core';
import { api, EditEmployeeForm } from 'entities/Employee';
import { employeeToForm } from 'entities/Employee/helpers';
import React from 'react';
import { useQuery } from 'react-query';
import { useIdParam } from 'shared/hooks';

export function EmployeeDetailsRoute() {
  const id = useIdParam();
  const { data: employee, isLoading } = useQuery(['employee', id], () => api.getOneById(id));
  return (
    <div>
      <LoadingOverlay visible={isLoading} />
      {employee && (
        <EditEmployeeForm
          defaultValues={{
            form: employeeToForm(employee),
            supervisor: employee.supervisor,
          }}
        />
      )}
    </div>
  );
}
