import { Button, Card, LoadingOverlay, Text, SegmentedControl, TextInput } from '@mantine/core';
import {
  api,
  CreateEmployeeDTO,
  DefaultEmployeeFields,
  Employee,
  EmployeeFormFields,
  EmployeeStatus,
  SelectEmployee,
} from 'entities/Employee';
import { SelectDepartment } from 'entities/Department';
import { UploadFile, UserDocument } from 'entities/Files';
import { SelectPosition } from 'entities/Position';
import React, { useMemo, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useMutation, useQueryClient } from 'react-query';
import { useIdParam } from 'shared/hooks';
import { ApprovalsTimeline } from 'entities/Approval';
import { dequal } from 'dequal';

export function EditEmployeeForm({ defaultValues }: { defaultValues: DefaultEmployeeFields }): JSX.Element {
  const {
    register,
    handleSubmit,
    control,
    reset,
    setValue,
    getValues,
    formState: { errors },
  } = useForm<EmployeeFormFields>({
    defaultValues: defaultValues.form,
  });
  const id = useIdParam();
  const [uploaded, setUploaded] = useState<UserDocument[]>(defaultValues.documents);

  const [supervisor, setSupervisor] = useState<Employee | null>(defaultValues.supervisor);

  const queryClient = useQueryClient();

  const updating = useMutation((data: CreateEmployeeDTO) => api.updateEmployee(id, data), {
    onSuccess: (res) => {
      queryClient.invalidateQueries(['employee', id]);
      setUploaded(res.documents);
    },
  });

  const areDocumentsChanged = useMemo(
    () => !dequal(defaultValues.documents, uploaded),
    [defaultValues.documents, uploaded]
  );

  const values = getValues();
  const isFormChanged = useMemo(() => !dequal(defaultValues.form, values), [defaultValues.form, values]);
  console.log({ values, '1': defaultValues.form });
  const isChanged = isFormChanged || areDocumentsChanged;

  const cancelChanges = () => {
    reset();
    setUploaded(defaultValues.documents);
  };

  const onSubmit = async (form: EmployeeFormFields) => {
    if (isChanged) {
      if (supervisor) {
        updating.mutate({
          ...form,
          salary: parseInt(form.salary ?? '', 10),
          phone: form.phone ?? null,
          location: form.location ?? null,
          supervisorId: supervisor.id,
          documents: uploaded.map((doc) => doc.id),
        });
      }
    }
  };

  return (
    <section className="relative mx-auto grid grid-cols-1 md:grid-cols-5 gap-4 items-start">
      <LoadingOverlay visible={updating.isLoading} />
      <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4 col-span-3">
        <Card withBorder shadow="md" p="lg" className="space-y-2 overflow-visible">
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
              {...register('salary')}
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
              <SelectEmployee onChange={setSupervisor} defaultValue={supervisor?.id} />
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
      </form>

      <ApprovalsTimeline className="col-span-2" />
    </section>
  );
}
