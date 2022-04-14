import { Badge } from '@mantine/core';
import React from 'react';
import { Employee, EmployeeStatus } from '..';

export function parseEmployeeStatus(candidate?: Employee, status?: EmployeeStatus): JSX.Element | null {
  if (candidate) {
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
  if (status) {
    switch (status) {
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
  return null;
}
