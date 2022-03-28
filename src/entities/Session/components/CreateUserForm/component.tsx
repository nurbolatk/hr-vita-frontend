import { Button, Card, TextInput } from '@mantine/core';
import React from 'react';

export function CreateUserForm(): JSX.Element {
  const inputRef = React.useRef<HTMLInputElement>(null);
  const hashContainer = React.useRef<HTMLParagraphElement>(null);

  const generateHash = async () => {
    const pass = inputRef.current?.value ?? 'asdfasdf';
    if (hashContainer.current) {
      hashContainer.current.textContent = pass;
    }
  };
  return (
    <Card className="flex items-end gap-x-4" shadow="sm" withBorder>
      <TextInput ref={inputRef} label="Generate hash" />
      <Button onClick={generateHash}>Generate</Button>
      <p ref={hashContainer} />
    </Card>
  );
}
