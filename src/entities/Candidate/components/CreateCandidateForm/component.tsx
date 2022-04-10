import { Button, Card, LoadingOverlay, TextInput } from '@mantine/core';
import { useAuth } from 'app/providers';
import { api } from 'entities/Candidate';
import { SelectDepartment } from 'entities/Department';
import { UploadFile, UserDocument } from 'entities/Files';
import { SelectPosition } from 'entities/Position';
import React, { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useMutation } from 'react-query';
import { useNavigate } from 'react-router-dom';
import type { Candidate, CandidateFormFields, CreateCandidateDTO } from '../../types';

export function CreateCandidateForm(): JSX.Element {
  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm<CandidateFormFields>();
  const { token } = useAuth();
  const navigate = useNavigate();
  const [uploaded, setUploaded] = useState<UserDocument[]>([]);

  const creation = useMutation((data: CreateCandidateDTO) => api.createCandidate(data, token), {
    onSuccess: (candidate: Candidate) => {
      navigate(`/recruiting/${candidate.id}`);
    },
  });

  const onSubmit = async (form: CandidateFormFields) => {
    creation.mutate({
      ...form,
      salary: parseInt(form.salary ?? '', 10),
      documents: uploaded.map((doc) => doc.id),
    });
  };

  return (
    <section className="relative mx-auto">
      <LoadingOverlay visible={creation.isLoading} />
      <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4">
        <Card withBorder shadow="md" p="lg">
          <h3 className="mb-3 text-xl">Profile</h3>
          <div className="grid gap-x-4 gap-y-2 sm:grid-cols-2">
            <TextInput
              label="Имя"
              className="font-medium block"
              type="text"
              // required
              {...register(
                'firstName'
                // { required: 'Необходимо заполнить' }
              )}
              error={errors.firstName?.message}
            />
            <TextInput
              label="Фамилия"
              className="font-medium block"
              type="text"
              // required
              {...register(
                'lastName'
                // { required: 'Необходимо заполнить' }
              )}
              error={errors.lastName?.message}
            />
          </div>

          <div className="grid gap-x-4 gap-y-2 sm:grid-cols-2">
            <TextInput
              label="Эл. почта"
              className="font-medium block"
              type="email"
              // required
              {...register(
                'email'
                // { required: 'Необходимо заполнить' }
              )}
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
              // rules={{ required: 'Надо выбрать' }}
              render={({ field: { value, onChange }, fieldState: { error } }) => {
                return <SelectPosition setValue={setValue} value={value} onChange={onChange} error={error?.message} />;
              }}
            />
            <Controller
              control={control}
              name="department"
              // rules={{ required: 'Надо выбрать' }}
              render={({ field: { value, onChange }, fieldState: { error } }) => {
                return (
                  <SelectDepartment setValue={setValue} value={value} onChange={onChange} error={error?.message} />
                );
              }}
            />
          </div>
        </Card>

        <Card
          withBorder
          shadow="sm"
          p="lg"
          style={{
            overflow: 'visible',
          }}>
          <div className="flex mb-3 items-center gap-x-4">
            <h3 className="text-xl">Documents</h3>
          </div>
          <UploadFile uploaded={uploaded} setUploaded={setUploaded} />
        </Card>

        <Button type="submit" variant="filled" className="mt-4">
          Submit
        </Button>
      </form>
    </section>
  );
}
