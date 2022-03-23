import { Button } from '@mantine/core';
import React from 'react';

export function CabinateRoute(): JSX.Element {
  return (
    <section>
      <Button>Add candidate</Button>
      <Button variant="outline">Send application</Button>
    </section>
  );
}
