import React, { createContext, useContext, useReducer } from 'react';
import { Button, Card, TextInput } from '@mantine/core';
import { Controller, useForm } from 'react-hook-form';
import { api } from 'entities/Candidate';
import { SelectPosition } from 'entities/Position';
import { SelectDepartment } from 'entities/Department';
import { useAuth } from 'app/providers';
import { CreateInterview } from 'entities/Interview';
import dayjs from 'dayjs';
import { NewCandidateFields } from '../../types';

export type InterviewDto = {
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
      payload: InterviewDto;
    };

const reducer = (state: InterviewDto[], action: Action): InterviewDto[] => {
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
const changeInterview = (dispatch: React.Dispatch<Action>, interview: InterviewDto) =>
  dispatch({
    type: 'CHANGE',
    payload: interview,
  });

const CreateInterviewContext = createContext<
  | {
      state: InterviewDto[];
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

  const [state, dispatch] = useReducer(reducer, []);

  const { token } = useAuth();

  const onSubmit = (form: NewCandidateFields) => {
    api.createEntity(form, token);
  };

  const parseInterviews = () => {
    // const fullyFilled = state.every((interview) => interview.interviewerId && interview.date && interview.time);
    // if (fullyFilled) {
    state.map((interview) => {
      const date = dayjs(interview.date);
      const time = dayjs(interview.time);
      let datetime = date.add(time.hour(), 'hour');
      datetime = datetime.add(time.minute(), 'minute');
      return {
        interviewerId: interview.interviewerId,
        datetime: datetime.toDate(),
      };
    });
    // }
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
            <Button size="xs" type="button" onClick={() => addNewInterview(dispatch)} disabled={state.length > 4}>
              Add
            </Button>
          </div>

          <CreateInterviewContext.Provider value={{ state, dispatch, removeInterview, changeInterview }}>
            {state.map((interview) => (
              <CreateInterview key={interview.id} interview={interview} />
            ))}
          </CreateInterviewContext.Provider>

          <Button
            type="button"
            variant="filled"
            className="mt-4"
            onClick={() => {
              console.log(state);
              parseInterviews();
            }}>
            Submit
          </Button>
        </Card>
      </form>
    </section>
  );
}
