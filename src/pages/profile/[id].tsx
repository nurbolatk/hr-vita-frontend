import { Card, TextInput, Text, Button, LoadingOverlay } from '@mantine/core';
import { useAuth } from 'app/providers';
import { dequal } from 'dequal';
import { api, Employee } from 'entities/Employee';
import React, { useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { client } from 'shared/helpers';
import { useIdParam } from 'shared/hooks';

type UpdateMeForm = {
  location: string;
  phone: string;
};

export function ProfileRoute() {
  const id = useIdParam();
  const { data: employee, isLoading } = useQuery(['employee', id], () => api.getOneById(id));
  const { user, isAuthLoading, token } = useAuth();
  const isOwner = employee !== undefined && user !== null && employee?.id === user?.id;

  const queryClient = useQueryClient();
  const updating = useMutation(
    (values: UpdateMeForm) => {
      return client<Employee>(`users/me`, {
        method: 'PUT',
        data: {
          phone: values.phone || null,
          location: values.location || null,
        },
        token,
      });
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['employee', id]);
      },
    }
  );

  const {
    register,
    reset,
    handleSubmit,
    getValues,
    formState: { isDirty },
  } = useForm<UpdateMeForm>();

  const defaultValues: UpdateMeForm = useMemo(
    () => ({
      location: employee?.location ?? '',
      phone: employee?.phone ?? '',
    }),
    [employee?.location, employee?.phone]
  );
  const values = getValues();
  const isChanged = useMemo(() => !dequal(defaultValues, values), [defaultValues, values]);

  const updateMe = (form: UpdateMeForm) => {
    updating.mutate(form);
  };
  const cancelChanges = () => {
    reset();
  };

  const loading: boolean = isLoading || isAuthLoading || updating.isLoading;

  const { t } = useTranslation();
  return (
    <section className="mx-auto">
      <div className="relative ">
        <LoadingOverlay visible={loading} />
        <form onSubmit={handleSubmit(updateMe)} className="grid gap-4 max-w-xl mx-auto">
          <Card withBorder shadow="md" p="lg" className="space-y-2 overflow-visible">
            <h3 className="mb-3 text-xl flex items-baseline justify-between">
              {t('Profile')}
              {isChanged && (
                <div>
                  <Button type="button" className="mr-2" variant="default" compact onClick={cancelChanges}>
                    {t('Cancel')}
                  </Button>
                  <Button type="submit" compact>
                    {t('Save')}
                  </Button>
                </div>
              )}
            </h3>
            <div className="grid gap-x-4 gap-y-2 sm:grid-cols-2">
              <TextInput
                defaultValue={employee?.firstName}
                variant="unstyled"
                sx={{
                  pointerEvents: 'none',
                }}
                label="Имя"
                className="font-medium block"
                type="text"
              />
              <TextInput
                defaultValue={employee?.lastName}
                variant="unstyled"
                sx={{
                  pointerEvents: 'none',
                }}
                label="Фамилия"
                className="font-medium block"
                type="text"
              />
            </div>

            <div className="grid gap-x-4 gap-y-2 sm:grid-cols-2">
              <TextInput
                defaultValue={employee?.email}
                variant="unstyled"
                sx={{
                  pointerEvents: 'none',
                }}
                label="Эл. почта"
                className="font-medium block"
                type="text"
              />
              <TextInput
                defaultValue={employee?.supervisor?.fullName}
                variant="unstyled"
                sx={{
                  pointerEvents: 'none',
                }}
                label="Руководитель"
                className="font-medium block"
                type="text"
              />
            </div>

            <div className="grid gap-x-4 gap-y-2 sm:grid-cols-2">
              <TextInput
                variant={isOwner ? 'default' : 'unstyled'}
                sx={{
                  pointerEvents: isOwner ? 'all' : 'none',
                }}
                label="Номер телефона"
                className="font-medium block"
                type="tel"
                {...register('phone')}
                defaultValue={employee?.phone ?? ''}
              />
              <TextInput
                defaultValue={employee?.location ?? ''}
                variant={isOwner ? 'default' : 'unstyled'}
                sx={{
                  pointerEvents: isOwner ? 'all' : 'none',
                }}
                label="Место жительства"
                className="font-medium block"
                type="text"
                {...register('location')}
              />
            </div>

            <div className="grid gap-x-4 gap-y-2 sm:grid-cols-2">
              <TextInput
                defaultValue={employee?.position.name}
                variant="unstyled"
                sx={{
                  pointerEvents: 'none',
                }}
                label="Должность"
                className="font-medium block"
                type="text"
              />

              <TextInput
                defaultValue={employee?.department.name}
                variant="unstyled"
                sx={{
                  pointerEvents: 'none',
                }}
                label="Отдел"
                className="font-medium block"
                type="text"
              />
            </div>
          </Card>
        </form>
      </div>
    </section>
  );
}
