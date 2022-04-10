import { Button, Card, LoadingOverlay, Text, SegmentedControl, TextInput } from '@mantine/core';
import {
  api,
  CreateEmployeeDTO,
  Employee,
  EmployeeFormFields,
  EmployeeStatus,
  SelectEmployee,
} from 'entities/Employee';
import { SelectDepartment } from 'entities/Department';
import { UploadFile, UserDocument } from 'entities/Files';
import { SelectPosition } from 'entities/Position';
import React, { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useMutation } from 'react-query';
import { useNavigate } from 'react-router-dom';

export function CreateEmployeeForm(): JSX.Element {
  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm<EmployeeFormFields>();
  const navigate = useNavigate();
  const [uploaded, setUploaded] = useState<UserDocument[]>([]);

  const [supervisor, setSupervisor] = useState<Employee | null>(null);

  const creation = useMutation((data: CreateEmployeeDTO) => api.createEmployee(data), {
    onSuccess: (candidate: Employee) => {
      navigate(`/employees/${candidate.id}`);
    },
  });

  const onSubmit = async (form: EmployeeFormFields) => {
    if (supervisor) {
      creation.mutate({
        ...form,
        salary: parseInt(form.salary ?? '', 10),
        phone: form.phone ?? null,
        location: form.location ?? null,
        supervisorId: supervisor.id,
        documents: uploaded.map(({ id }) => id),
      });
    }
  };

  return (
    <section className="relative mx-auto">
      <LoadingOverlay visible={creation.isLoading} />
      <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4">
        <Card withBorder shadow="md" p="lg" className="space-y-2 overflow-visible">
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
              className="font-medium block"
              type="number"
              {...register('salary', {
                valueAsNumber: true,
              })}
              error={errors.salary?.message}
            />
            <TextInput
              label="Место жительства"
              className="font-medium block"
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
          <div className="grid gap-x-4 gap-y-2 sm:grid-cols-2">
            <div>
              <Text size="sm" weight={500}>
                Supervisor
              </Text>
              <SelectEmployee onChange={setSupervisor} />
            </div>
            <Controller
              control={control}
              name="status"
              defaultValue={EmployeeStatus.NOT_ACCEPTED}
              render={({ field: { value, onChange }, fieldState: { error } }) => (
                <div>
                  <Text size="sm" weight={500}>
                    Status
                  </Text>
                  <SegmentedControl
                    value={value}
                    onChange={onChange}
                    data={[
                      { label: 'Ongoing', value: EmployeeStatus.NOT_ACCEPTED },
                      { label: 'Working', value: EmployeeStatus.WORKING },
                      { label: 'Fired', value: EmployeeStatus.FIRED },
                    ]}
                  />
                </div>
              )}
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
