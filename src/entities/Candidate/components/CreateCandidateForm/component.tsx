import React from 'react';
import { Button, Card, TextInput } from '@mantine/core';
import { Controller, useForm } from 'react-hook-form';
import { api } from 'entities/Candidate';
import { SelectPosition } from 'entities/Position';
import { SelectDepartment } from 'entities/Department';
import { useAuth } from 'app/providers';
import { NewCandidateFields } from '../../types';

export function CreateCandidateForm(): JSX.Element {
  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm<NewCandidateFields>();

  const { token } = useAuth();
  const onSubmit = (form: NewCandidateFields) => {
    api.createEntity(form, token);
  };

  return (
    <section className="max-w-xl mx-auto">
      <form onSubmit={handleSubmit(onSubmit)}>
        <Card withBorder shadow="md" p="lg">
          <h3 className="mb-3 text-xl">Profile</h3>
          <div className="grid gap-x-4 gap-y-2 sm:grid-cols-2">
            <TextInput
              label="Имя"
              className="font-medium block"
              type="text"
              required
              {...register('firstName', { required: 'Необходимо заполнить' })}
              error={errors.firstName?.message}
            />
            <TextInput
              label="Фамилия"
              className="font-medium block"
              type="text"
              required
              {...register('lastName', { required: 'Необходимо заполнить' })}
              error={errors.lastName?.message}
            />
          </div>

          <div className="grid gap-x-4 gap-y-2 sm:grid-cols-2">
            <TextInput
              label="Эл. почта"
              className="font-medium block"
              type="email"
              required
              {...register('email', { required: 'Необходимо заполнить' })}
              error={errors.email?.message}
            />
            <TextInput
              label="Номер телефона"
              className="font-medium block"
              type="tel"
              {...register('phone')}
              error={errors.phone?.message}
            />
          </div>

          <div className="grid gap-x-4 gap-y-2 sm:grid-cols-2">
            <TextInput
              label="Зарплата"
              className="mb-1 font-medium block"
              type="number"
              {...register('salary', {
                valueAsNumber: true,
              })}
              error={errors.salary?.message}
            />
            <TextInput
              label="Место жительства"
              className="mb-1 font-medium block"
              type="text"
              {...register('location')}
              error={errors.location?.message}
            />
          </div>

          <div className="grid gap-x-4 gap-y-2 sm:grid-cols-2">
            <Controller
              control={control}
              name="position"
              rules={{ required: 'Надо выбрать' }}
              render={({ field: { value, onChange }, fieldState: { error } }) => {
                return <SelectPosition setValue={setValue} value={value} onChange={onChange} error={error?.message} />;
              }}
            />
            <Controller
              control={control}
              name="department"
              rules={{ required: 'Надо выбрать' }}
              render={({ field: { value, onChange }, fieldState: { error } }) => {
                return (
                  <SelectDepartment setValue={setValue} value={value} onChange={onChange} error={error?.message} />
                );
              }}
            />
          </div>
          <Button className="mt-4" type="submit">
            Create
          </Button>
        </Card>
      </form>
    </section>
  );
}
