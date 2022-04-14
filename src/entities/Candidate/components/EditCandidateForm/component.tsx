/* eslint-disable no-nested-ternary */
import { Anchor, Breadcrumbs, Button, Card, LoadingOverlay, TextInput } from '@mantine/core';
import { useAuth } from 'app/providers';
import { dequal } from 'dequal';
import { api } from 'entities/Candidate';
import { SelectDepartment } from 'entities/Department';
import { UploadFile, UserDocument } from 'entities/Files';
import { InterviewsTimeline } from 'entities/Interview';
import { SelectPosition } from 'entities/Position';
import React, { useMemo, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useMutation, useQueryClient } from 'react-query';
import { useIdParam } from 'shared/hooks';
import { CandidateStatus } from 'entities/Candidate/types';
import { parseCandidateStatusJSX } from 'entities/Candidate/helpers';
import { Link } from 'react-router-dom';
import type { CandidateFormFields, DefaultCandidateFields, UpdateCandidateData } from '../../types';

export function EditCandidateForm({ defaultValues }: { defaultValues: DefaultCandidateFields }): JSX.Element {
  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { isDirty, errors },
    reset,
    getValues,
  } = useForm<CandidateFormFields>({
    defaultValues: defaultValues.form,
  });

  const id = useIdParam();
  const { token } = useAuth();

  const [uploaded, setUploaded] = useState<UserDocument[]>(defaultValues.documents);
  const queryClient = useQueryClient();

  const mutation = useMutation((data: UpdateCandidateData) => api.updateCandidateForm(id, data, token), {
    onSuccess: (res) => {
      setUploaded(res.documents);
      queryClient.invalidateQueries(['candidate', id]);
    },
  });

  const statusMutation = useMutation(
    (data: { status: CandidateStatus }) => api.updateCandidateStatus(id, data, token),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['candidate', id]);
      },
    }
  );

  // edit form
  const values = getValues();
  const areDocumentsChanged = useMemo(
    () => !dequal(defaultValues.documents, uploaded),
    [defaultValues.documents, uploaded]
  );
  const isFormChanged = useMemo(() => !dequal(defaultValues.form, values), [defaultValues.form, values]);
  const isChanged = isFormChanged || areDocumentsChanged;

  const onSubmit = (form: CandidateFormFields) => {
    if (isChanged) {
      const data: UpdateCandidateData = {};
      if (isFormChanged) {
        data.form = {
          ...form,
          salary: form.salary ? parseInt(form.salary, 10) : null,
          location: form.location || null,
          phone: form.phone || null,
        };
      }
      if (areDocumentsChanged) {
        data.documents = uploaded.map((doc) => doc.id);
      }

      mutation.mutate(data);
    }
  };

  const cancelChanges = () => {
    reset();
    setUploaded(defaultValues.documents);
  };

  return (
    <section className="mx-auto">
      <Breadcrumbs className="mb-4">
        {[
          { title: 'Recruiting', href: '/recruiting' },
          { title: `${defaultValues.form.firstName} ${defaultValues.form.lastName}`, href: `/recruiting/${id}` },
        ].map((item) => (
          <Anchor<typeof Link> component={Link} to={item.href} key={item.href}>
            {item.title}
          </Anchor>
        ))}
      </Breadcrumbs>

      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 items-start">
        <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4 relative col-span-3">
          <LoadingOverlay visible={mutation.isLoading || statusMutation.isLoading} />
          <Card withBorder shadow="md" p="lg">
            <h3 className="mb-3 text-xl flex items-baseline justify-between">
              Profile
              {isChanged && (
                <div>
                  <Button type="button" className="mr-2" variant="default" compact onClick={cancelChanges}>
                    Cancel
                  </Button>
                  <Button type="submit" compact>
                    Save
                  </Button>
                </div>
              )}
            </h3>
            <div className="space-y-2">
              <div className="flex items-baseline gap-2 text-sm">
                Status: {parseCandidateStatusJSX(defaultValues.status)}
              </div>
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

              <div className="grid gap-x-4 gap-y-2 sm:grid-cols-2">
                <Controller
                  control={control}
                  name="position"
                  // rules={{ required: 'Надо выбрать' }}
                  render={({ field: { value, onChange }, fieldState: { error } }) => {
                    return (
                      <SelectPosition setValue={setValue} value={value} onChange={onChange} error={error?.message} />
                    );
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
        </form>

        <div className="grid col-span-3 md:col-span-2 gap-4">
          <InterviewsTimeline />
          {defaultValues.status !== CandidateStatus.HIRED && defaultValues.status !== CandidateStatus.FAILED && (
            <Card
              withBorder
              shadow="sm"
              p="lg"
              style={{
                overflow: 'visible',
              }}>
              <h3 className="text-xl mb-3">Update candidate status</h3>
              <div className="flex items-center gap-x-4">
                <Button
                  variant="light"
                  onClick={() => {
                    statusMutation.mutate({
                      status: CandidateStatus.HIRED,
                    });
                  }}>
                  Hire candidate
                </Button>
                <Button
                  variant="light"
                  color="red"
                  onClick={() => {
                    statusMutation.mutate({
                      status: CandidateStatus.FAILED,
                    });
                  }}>
                  Reject candidate
                </Button>
              </div>
            </Card>
          )}
        </div>
      </div>
    </section>
  );
}
