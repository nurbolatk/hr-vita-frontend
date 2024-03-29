import React, { useEffect, useState } from 'react';
import { Alert, Button, Text, TextInput } from '@mantine/core';

import { Employee, SelectEmployee } from 'entities/Employee';
import { DatePicker, TimeInput } from '@mantine/dates';
import { Interview } from 'entities/Interview';
import { useForm } from 'react-hook-form';
import { Modal } from 'shared/components/organisms';
import { useIdParam } from 'shared/hooks';
import { useInterviewQueries } from 'entities/Interview/hooks';
import { useTranslation } from 'react-i18next';

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
export function InterviewDetailsModal({ defaultValue }: { defaultValue?: Interview | null }): JSX.Element {
  const intervieweeId = useIdParam();
  const { register, handleSubmit, setValue } = useForm<InterviewFormFields>();
  const [state, setState] = useState<InterviewStateFields>({
    date: null,
    start: null,
    end: null,
    interviewer: null,
  });
  const [error, setError] = useState<Boolean>(false);

  useEffect(() => {
    if (defaultValue) {
      setState({
        date: defaultValue?.date ?? null,
        start: defaultValue?.start ?? null,
        end: defaultValue?.end ?? null,
        interviewer: defaultValue?.interviewer ?? null,
      });
      setValue('name', defaultValue?.name ?? '');
      setValue('location', defaultValue?.location ?? '');
    }
  }, [defaultValue, setValue]);

  const { creation, updating } = useInterviewQueries();

  const handleChange: (type: 'start' | 'end' | 'date') => (value: Date | null) => void = (type) => (value) => {
    if (type === 'start') {
      return setState({ ...state, start: value });
    }
    if (type === 'end') {
      return setState({ ...state, end: value });
    }
    return setState({ ...state, date: value });
  };

  const handleInterviewerChange = (interviewer: Employee | null) => {
    setState({
      ...state,
      interviewer,
    });
  };
  const { t } = useTranslation();

  function sendInterview(form: InterviewFormFields) {
    if (state.date && state.start && state.end && state.interviewer) {
      const { name, location } = form;
      const { date, start, end, interviewer } = state;
      if (defaultValue) {
        // update
        updating.mutate({
          id: defaultValue.id,
          intervieweeId,
          interviewerId: interviewer.id,
          date,
          start,
          end,
          name,
          location,
          status: defaultValue.status,
        });
      } else {
        // create
        creation.mutate({
          intervieweeId,
          interviewerId: interviewer.id,
          date,
          start,
          end,
          name,
          location,
        });
      }
    } else {
      setError(true);
    }
  }

  return (
    <Modal.Content title="Interview details">
      <form className="space-y-3 relative" onSubmit={handleSubmit(sendInterview)}>
        {error && <Alert color="red">{t('Please, fill all the values')}</Alert>}
        <TextInput
          label="Interview name"
          placeholder="E.g. First techincal interview"
          // required
          {...register('name')}
        />
        <Text component="label" size="sm" weight={500}>
          <span className="block mb-1 mt-3">{t('Interviewer')}</span>
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

        <Modal.Actions>
          <Modal.CloseButton>
            <Button
              size="sm"
              sx={{
                opacity: 0.6,
              }}
              variant="default"
              color="gray">
              {t('Cancel')}
            </Button>
          </Modal.CloseButton>
          <Button size="sm" type="submit">
            {t('Save')}
          </Button>
        </Modal.Actions>
      </form>
    </Modal.Content>
  );
}
