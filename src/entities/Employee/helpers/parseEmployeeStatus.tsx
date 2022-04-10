import { Badge } from '@mantine/core';
import React from 'react';
import { Employee, EmployeeStatus } from '..';

export function parseEmployeeStatus(candidate: Employee): JSX.Element {
  switch (candidate.status) {
    case EmployeeStatus.FIRED:
      return (
        <Badge className="cursor-pointer" color="red">
          Fired
        </Badge>
      );
    case EmployeeStatus.WORKING:
      return (
        <Badge className="cursor-pointer" color="teal">
          Working
        </Badge>
      );
    default:
      return (
        <Badge className="cursor-pointer" color="gray">
          Onboarding
        </Badge>
      );
  }
}
