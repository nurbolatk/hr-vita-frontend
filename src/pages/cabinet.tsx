import { Button } from '@mantine/core';
import React from 'react';
import { Link } from 'react-router-dom';

export function CabinateRoute(): JSX.Element {
  return (
    <section>
      <Button<typeof Link> component={Link} to="/candidates/new">
        Add candidate
      </Button>
      <Button variant="outline">Send application</Button>
    </section>
  );
}
