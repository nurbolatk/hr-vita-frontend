import React from 'react';
import { Button, Card, TextInput } from '@mantine/core';
import { Controller, useForm } from 'react-hook-form';
// import { api } from 'entities/Candidate';
import { PositionsSelect } from 'entities/Position';
import { NewCandidateFields } from '../../types';

export function CreateCandidateForm(): JSX.Element {
  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm<NewCandidateFields>();

  const onSubmit = (form: NewCandidateFields) => {
    console.log(form);
    // api.createEntity(form);
  };

  return (
    <section className="max-w-xl mx-auto">
      <Card withBorder shadow="md" p="lg">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="sm:grid gap-x-4 grid-cols-2">
            <TextInput
              label="Имя"
              className="mb-1 font-medium block"
              type="text"
              required
              {...register('firstName', { required: 'Необходимо заполнить' })}
              error={errors.firstName?.message}
            />
            <TextInput
              label="Фамилия"
              className="mb-1 font-medium block"
              type="text"
              required
              {...register('lastName', { required: 'Необходимо заполнить' })}
              error={errors.lastName?.message}
            />
          </div>

          <div className="sm:grid gap-x-4 grid-cols-2">
            <TextInput
              label="Эл. почта"
              className="mb-1 font-medium block"
              type="email"
              required
              {...register('email', { required: 'Необходимо заполнить' })}
              error={errors.email?.message}
            />
            <TextInput
              label="Номер телефона"
              className="mb-1 font-medium block"
              type="tel"
              {...register('phone')}
              error={errors.phone?.message}
            />
          </div>

          <div className="sm:grid gap-x-4 grid-cols-2">
            <TextInput
              label="Зарплата"
              className="mb-1 font-medium block"
              type="number"
              {...register('salary')}
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

          <div className="sm:grid gap-x-4 grid-cols-2">
            <Controller
              control={control}
              name="position"
              rules={{ required: 'Надо выбрать' }}
              render={({ field: { value, onChange }, fieldState: { error } }) => {
                return <PositionsSelect setValue={setValue} value={value} onChange={onChange} error={error?.message} />;
              }}
            />
          </div>
          <Button type="submit">Create</Button>
        </form>
      </Card>
    </section>
  );
}
