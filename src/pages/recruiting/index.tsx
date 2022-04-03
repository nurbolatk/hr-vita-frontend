import { Button } from '@mantine/core';
import React from 'react';
import { Link } from 'react-router-dom';

export function RecruitingIndexRoute() {
  return (
    <div>
      <Button<typeof Link> component={Link} to="/candidates/new">
        Add candidate
      </Button>
      <Button variant="outline">Send application</Button>
    </div>
  );
}
