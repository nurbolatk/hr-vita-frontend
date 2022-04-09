/* eslint-disable no-nested-ternary */
import { Alert, Button, Card, Kbd, TextInput } from '@mantine/core';
import { useAuth } from 'app/providers';
import { dequal } from 'dequal';
import { api } from 'entities/Candidate';
import { SelectDepartment } from 'entities/Department';
import { UploadFile, UserDocument } from 'entities/Files';
import {
  addNewInterview,
  changeInterview,
  CreateInterview,
  CreateInterviewContext,
  CreateInterviewDto,
  newInterviewsReducer,
  removeInterview,
} from 'entities/Interview';
import { combineDateAndTime } from 'entities/Interview/helper';
import { SelectPosition } from 'entities/Position';
import React, { useReducer, useState, useMemo } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useIdParam } from 'shared/hooks';
import type { DefaultCandidateFields, CandidateFormFields, UpdateCandidateData } from '../../types';

export function EditCandidateForm({ defaultValue }: { defaultValue: DefaultCandidateFields }): JSX.Element {
  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { isDirty, errors },
    getValues,
  } = useForm<CandidateFormFields>({
    defaultValues: defaultValue,
  });

  const id = useIdParam();
  const { token } = useAuth();

  const [newInterviews, dispatch] = useReducer(newInterviewsReducer, defaultValue.interviews);

  const [uploaded, setUploaded] = useState<UserDocument | null>(defaultValue.documents?.[0] ?? null);

  // edit form
  const formValues = getValues();
  const values = useMemo(
    () => ({
      ...formValues,
    }),
    [formValues]
  );

  const areInterviewsChanged = useMemo(
    () => !dequal(defaultValue.interviews, newInterviews),
    [defaultValue.interviews, newInterviews]
  );
  const areDocumentsChanged = useMemo(
    () => !dequal(defaultValue.documents, uploaded ? [uploaded] : undefined),
    [defaultValue.documents, uploaded]
  );
  const isFormChanged = useMemo(() => !dequal(defaultValue, values), [defaultValue, values]);

  const isChanged = isFormChanged || areInterviewsChanged || areDocumentsChanged;

  console.log({ isDirty, isFormChanged, areDocumentsChanged, areInterviewsChanged });

  const parseInterviews = (): CreateInterviewDto[] => {
    return newInterviews.map((interview) => {
      const datetime = combineDateAndTime(interview.date!, interview.time!);
      return {
        interviewerId: interview.interviewerId as number,
        datetime,
      };
    });
  };

  const onSubmit = (form: CandidateFormFields) => {
    console.log({ form });
    const fullyFilled = newInterviews.every((interview) => interview.interviewerId && interview.date && interview.time);
    if (fullyFilled) {
      const data: UpdateCandidateData = {};
      if (isFormChanged || areDocumentsChanged) {
        data.form = {
          ...form,
          salary: form.salary ? parseInt(form.salary, 10) : null,
          location: form.location || null,
          phone: form.phone || null,
          documentId: uploaded?.id ?? null,
        };
      }
      if (areInterviewsChanged) {
        const interviews = parseInterviews();
        data.interviews = interviews;
      }
      api.updateCandidateForm(id, data, token);
    }

    // if (isChanged) {
    //   const updates: Promise<any>[] = [];
    //   if (isFormChanged) {
    //     updates.push(1);
    //   }
    //   if (areInterviewsChanged) updates.push(1);
    //   if (areDocumentsChanged) updates.push(1);
    //   Promise.all(updates);
    //   const interviews = parseInterviews();
    // }
  };

  return (
    <section className=" mx-auto">
      <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4">
        <Card withBorder shadow="md" p="lg">
          <h3 className="mb-3 text-xl flex items-baseline justify-between">
            Profile
            {isChanged && (
              <Button type="submit" size="sm">
                Save
              </Button>
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
            <h3 className="text-xl">Interviews</h3>
            <Button
              size="xs"
              type="button"
              compact
              onClick={() => addNewInterview(dispatch)}
              disabled={newInterviews.length > 4}>
              Add
            </Button>
          </div>

          <CreateInterviewContext.Provider
            value={{ newInterviews, dispatch, addNewInterview, removeInterview, changeInterview }}>
            {newInterviews.length === 0 && <Alert color="gray">No interviews are appointed</Alert>}
            {newInterviews.map((interview) => (
              <CreateInterview key={interview.id} interview={interview} />
            ))}
          </CreateInterviewContext.Provider>
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

        <Button type="submit" variant="filled" className="mt-4" disabled={!isChanged}>
          Update changes
        </Button>
      </form>
    </section>
  );
}
