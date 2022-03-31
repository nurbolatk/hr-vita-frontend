/* eslint-disable no-nested-ternary */
import React, { createContext, SVGAttributes, useContext, useReducer, useState } from 'react';
import { Button, Card, TextInput, Group, Text, useMantineTheme, MantineTheme, Alert } from '@mantine/core';
import { Controller, useForm } from 'react-hook-form';
import { api } from 'entities/Candidate';
import { SelectPosition } from 'entities/Position';
import { SelectDepartment } from 'entities/Department';
import { useAuth } from 'app/providers';
import { CreateInterview, CreateInterviewDto } from 'entities/Interview';
import dayjs from 'dayjs';

import { Dropzone, DropzoneStatus, IMAGE_MIME_TYPE } from '@mantine/dropzone';
import { CheckCircleIcon, CrossIcon, ImageIcon, UploadIcon } from 'shared/components/icons';
import { useMutation } from 'react-query';
import type { NewCandidateFields, UserDocument } from '../../types';

function getIconColor(status: DropzoneStatus, theme: MantineTheme) {
  return status.accepted
    ? theme.colors[theme.primaryColor][theme.colorScheme === 'dark' ? 4 : 6]
    : status.rejected
    ? theme.colors.red[theme.colorScheme === 'dark' ? 4 : 6]
    : theme.colorScheme === 'dark'
    ? theme.colors.dark[0]
    : theme.colors.gray[7];
}

function ImageUploadIcon({ status, ...props }: SVGAttributes<SVGElement> & { status: DropzoneStatus }) {
  if (status.accepted) {
    return <UploadIcon {...props} />;
  }

  if (status.rejected) {
    return <CrossIcon {...props} />;
  }

  return <ImageIcon {...props} />;
}

export const dropzoneChildren = (status: DropzoneStatus, theme: MantineTheme) => (
  <Group position="center" spacing="xl" style={{ minHeight: 220, pointerEvents: 'none' }}>
    <ImageUploadIcon status={status} style={{ color: getIconColor(status, theme) }} width={80} height={80} />

    <div>
      <Text size="xl" inline>
        Drag images here or click to select files
      </Text>
      <Text size="sm" color="dimmed" inline mt={7}>
        Attach as many files as you like, each file should not exceed 5mb
      </Text>
    </div>
  </Group>
);

function Demo() {
  const theme = useMantineTheme();
  const { token } = useAuth();
  const [uploaded, setFile] = useState<UserDocument | null>(null);

  const mutation = useMutation(
    (file: File) => {
      const formData = new FormData();
      formData.append('file', file, file.name);
      return api.uploadDocuments(formData, token);
    },
    {
      onSuccess(result) {
        setFile(result);
      },
    }
  );

  return uploaded ? (
    <Alert color="green" title="Success!" icon={<CheckCircleIcon />}>
      <strong>{uploaded.originalname}</strong> was uploaded successfully
    </Alert>
  ) : (
    <Dropzone
      onDrop={(files) => {
        mutation.mutate(files[0]);
      }}
      onReject={(files) => console.log('rejected files', files)}
      maxSize={3 * 1024 ** 2}
      accept={IMAGE_MIME_TYPE}
      loading={mutation.isLoading}>
      {(status) => dropzoneChildren(status, theme)}
    </Dropzone>
  );
}

export type InterviewState = {
  id: number;
  interviewerId: number | null;
  date: Date | null;
  time: Date | null;
};

type Action =
  | {
      type: 'ADD';
    }
  | {
      type: 'REMOVE';
      payload: number;
    }
  | {
      type: 'CHANGE';
      payload: InterviewState;
    };

const reducer = (state: InterviewState[], action: Action): InterviewState[] => {
  switch (action.type) {
    case 'ADD':
      return state.length < 5
        ? [...state, { id: Date.now() * Math.random(), interviewerId: null, date: null, time: null }]
        : state;
    case 'REMOVE':
      return state.filter((inteview) => {
        return inteview.id !== action.payload;
      });
    case 'CHANGE':
      return state.map((item) => {
        if (item.id === action.payload.id) {
          return action.payload;
        }
        return item;
      });
    default:
      throw new Error('Invalid action for interviews reducer');
  }
};

const addNewInterview = (dispatch: React.Dispatch<Action>) => dispatch({ type: 'ADD' });
const removeInterview = (dispatch: React.Dispatch<Action>, id: number) => dispatch({ type: 'REMOVE', payload: id });
const changeInterview = (dispatch: React.Dispatch<Action>, interview: InterviewState) =>
  dispatch({
    type: 'CHANGE',
    payload: interview,
  });

const CreateInterviewContext = createContext<
  | {
      state: InterviewState[];
      dispatch: React.Dispatch<Action>;
      removeInterview: typeof removeInterview;
      changeInterview: typeof changeInterview;
    }
  | undefined
>(undefined);
CreateInterviewContext.displayName = 'CreateInterviewContext';

export const useCreateInterview = () => {
  const value = useContext(CreateInterviewContext);
  if (!value) {
    throw new Error('useCreateInterview must be used inside CreateInterviewContextProvider');
  }

  return value;
};

export function CreateCandidateForm(): JSX.Element {
  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm<NewCandidateFields>();
  const { token } = useAuth();

  const [state, dispatch] = useReducer(reducer, []);

  const parseInterviews = (): CreateInterviewDto[] => {
    return state.map((interview) => {
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
    const fullyFilled = state.every((interview) => interview.interviewerId && interview.date && interview.time);
    if (fullyFilled) {
      const interviews = parseInterviews();
      api.createEntity({ ...form, interviews: interviews.length > 0 ? interviews : undefined }, token);
    }
  };

  return (
    <section className=" mx-auto">
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
            <h3 className="text-xl">Interviews</h3>
            <Button
              size="xs"
              type="button"
              compact
              onClick={() => addNewInterview(dispatch)}
              disabled={state.length > 4}>
              Add
            </Button>
          </div>

          <CreateInterviewContext.Provider value={{ state, dispatch, removeInterview, changeInterview }}>
            {state.length === 0 && <Alert color="gray">No interviews are appointed</Alert>}
            {state.map((interview) => (
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
          <Demo />
        </Card>

        <Button type="submit" variant="filled" className="mt-4">
          Submit
        </Button>
      </form>
    </section>
  );
}
