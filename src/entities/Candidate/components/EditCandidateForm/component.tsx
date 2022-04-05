/* eslint-disable no-nested-ternary */
import { Alert, Button, Card, TextInput } from '@mantine/core';
import { useAuth } from 'app/providers';
import dayjs from 'dayjs';
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
import { SelectPosition } from 'entities/Position';
import React, { useReducer, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import type { DefaultCandidateFields, NewCandidateFields } from '../../types';

export function EditCandidateForm({ defaultValue }: { defaultValue: DefaultCandidateFields }): JSX.Element {
  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { isDirty, errors },
    getValues,
  } = useForm<NewCandidateFields>({
    defaultValues: defaultValue,
  });

  const values = getValues();

  const isChanged = !dequal(defaultValue, values);
  console.log(defaultValue, values);

  console.log({ isDirty, isChanged });

  const { token } = useAuth();

  const [newInterviews, dispatch] = useReducer(newInterviewsReducer, []);

  const [uploaded, setUploaded] = useState<UserDocument | null>(null);

  const parseInterviews = (): CreateInterviewDto[] => {
    return newInterviews.map((interview) => {
      const date = dayjs(interview.date);
      const time = dayjs(interview.time);
      let datetime = date.add(time.hour(), 'hour');
      datetime = datetime.add(time.minute(), 'minute');
      return {
        interviewerId: interview.interviewerId as number,
        datetime: datetime.toDate(),
      };
    });
  };

  const onSubmit = (form: NewCandidateFields) => {
    const fullyFilled = newInterviews.every((interview) => interview.interviewerId && interview.date && interview.time);
    if (fullyFilled) {
      const interviews = parseInterviews();
      api.createEntity(
        {
          ...form,
          salary: parseInt(form.salary ?? '', 10),
          interviews: interviews.length > 0 ? interviews : undefined,
          documentId: uploaded?.id,
        },
        token
      );
    }
  };

  return (
    <section className=" mx-auto">
      <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4">
        <Card withBorder shadow="md" p="lg">
          <h3 className="mb-3 text-xl">
            Profile
            {isChanged && <Button>Save</Button>}
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
              type="tel"
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

        <Button type="submit" variant="filled" className="mt-4">
          Submit
        </Button>
      </form>
    </section>
  );
}
