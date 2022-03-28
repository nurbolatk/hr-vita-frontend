import React from 'react';
import { Button, Card, TextInput } from '@mantine/core';
import { useForm } from 'react-hook-form';
import { api } from 'entities/Candidate';
import { NewCandidateFields } from '../../types';

export function CreateCandidateForm(): JSX.Element {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<NewCandidateFields>();

  const onSubmit = (form: NewCandidateFields) => {
    api.createEntity(form);
  };

  return (
    <section className="max-w-xl mx-auto">
      <Card shadow="md" p="lg">
        <form onSubmit={handleSubmit(onSubmit)}>
          <TextInput
            label="First Name"
            className="mb-1 font-medium block"
            type="text"
            required
            {...register('firstName', { required: 'Необходимо заполнить' })}
            error={errors.firstName?.message}
          />
          <TextInput
            label="Last Name"
            className="mb-1 font-medium block"
            type="text"
            required
            {...register('lastName', { required: 'Необходимо заполнить' })}
            error={errors.lastName?.message}
          />
          <TextInput
            label="Email"
            className="mb-1 font-medium block"
            type="email"
            {...register('email')}
            error={errors.email?.message}
          />
          <Button type="submit">Create</Button>
        </form>
      </Card>
    </section>
  );
}
