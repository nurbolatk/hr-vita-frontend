import React, { useState } from 'react';
import { Button, Text, TextInput, UnstyledButton } from '@mantine/core';

import { Employee, SelectEmployee } from 'entities/Employee';
import { DatePicker, TimeInput } from '@mantine/dates';
import { InterviewState, useCreateInterview } from 'entities/Interview';
import { useForm } from 'react-hook-form';
import { Modal } from 'shared/components/organisms';

type InterviewFormFields = {
  name: string;
  location: string;
};

type InterviewStateFields = {
  date: Date | null;
  start: Date | null;
  end: Date | null;
  interviewer: Employee | null;
};

export function InterviewDetailsModal({ defaultValue }: { defaultValue?: InterviewState }): JSX.Element {
  const { register, handleSubmit } = useForm<InterviewFormFields>();

  const [state, setState] = useState<InterviewStateFields>({
    date: null,
    start: null,
    end: null,
    interviewer: null,
  });

  const handleChange: (type: 'start' | 'end' | 'date') => (value: Date | null) => void = (type) => (value) => {
    console.log('type', value);

    if (type === 'start') {
      return setState({ ...state, start: value });
    }
    if (type === 'end') {
      return setState({ ...state, end: value });
    }
    return setState({ ...state, date: value });
  };
  console.log(state);

  const handleInterviewerChange = (interviewer: Employee | null) => {
    setState({
      ...state,
      interviewer,
    });
  };

  function sendInterview(form: InterviewFormFields) {
    console.log(form);
  }

  return (
    <Modal.Content title="Interview details">
      <form className="space-y-3 relative" onSubmit={handleSubmit(sendInterview)}>
        <TextInput
          label="Interview name"
          placeholder="E.g. First techincal interview"
          // required
          {...register('name')}
        />
        <Text component="label" size="sm" weight={500}>
          <span className="block mb-1 mt-3">Interviewer</span>
          <SelectEmployee onChange={handleInterviewerChange} defaultValue={state.interviewer?.id} />
        </Text>
        <div className="grid grid-cols-5 gap-x-4">
          <DatePicker
            placeholder="Date of interview"
            className="col-span-3"
            value={state.date}
            onChange={handleChange('date')}
            label="Date"
          />
          <TimeInput className="col-span-1" value={state.start} onChange={handleChange('start')} label="Start Time" />
          <TimeInput className="col-span-1" value={state.end} onChange={handleChange('end')} label="End Time" />
        </div>
        <TextInput
          label="Address or link"
          placeholder="E.g. Office 303 or metting link"
          // required
          {...register('location')}
        />

        <div className="flex gap-x-4 justify-end mt-4">
          <Modal.CloseButton>
            <Button
              size="sm"
              sx={{
                opacity: 0.6,
              }}
              variant="outline"
              color="gray">
              Cancel
            </Button>
          </Modal.CloseButton>
          <Button size="sm" type="submit">
            Save
          </Button>
        </div>
      </form>
    </Modal.Content>
  );
}
