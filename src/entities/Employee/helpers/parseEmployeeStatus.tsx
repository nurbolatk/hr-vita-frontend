import { Badge } from '@mantine/core';
import React from 'react';
import { Employee, EmployeeStatus } from '..';

export function parseEmployeeStatusJSX(t: any, candidate?: Employee, status?: EmployeeStatus): JSX.Element | null {
  if (candidate) {
    switch (candidate.status) {
      case EmployeeStatus.FIRED:
        return (
          <Badge className="cursor-pointer" color="red">
            {t('Fired')}
          </Badge>
        );
      case EmployeeStatus.WORKING:
        return (
          <Badge className="cursor-pointer" color="teal">
            {t('Working')}
          </Badge>
        );
      default:
        return (
          <Badge className="cursor-pointer" color="blue">
            {t('Onboarding')}
          </Badge>
        );
    }
  }
  if (status) {
    switch (status) {
      case EmployeeStatus.FIRED:
        return (
          <Badge className="cursor-pointer" color="red">
            {t('Fired')}
          </Badge>
        );
      case EmployeeStatus.WORKING:
        return (
          <Badge className="cursor-pointer" color="teal">
            {t('Working')}
          </Badge>
        );
      default:
        return (
          <Badge className="cursor-pointer" color="blue">
            {t('Onboarding')}
          </Badge>
        );
    }
  }
  return null;
}
