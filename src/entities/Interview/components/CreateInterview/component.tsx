import React from 'react';
import { Text, UnstyledButton } from '@mantine/core';

import { Employee, SelectEmployee } from 'entities/Employee';
import { DatePicker, TimeInput } from '@mantine/dates';
import { CrossIcon } from 'shared/components/icons';
import { InterviewDto, useCreateInterview } from 'entities/Candidate';

export function CreateInterview({ interview }: { interview: InterviewDto }): JSX.Element {
  const { removeInterview, dispatch, changeInterview } = useCreateInterview();

  const handleChange: (type: 'time' | 'date') => (value: Date | null) => void = (type) => (value) => {
    if (type === 'time') {
      return changeInterview(dispatch, { ...interview, time: value });
    }
    return changeInterview(dispatch, { ...interview, date: value });
  };

  const handleInterviewerChange = (interviewer: Employee | null) => {
    changeInterview(dispatch, { ...interview, interviewerId: interviewer?.id ?? null });
  };

  return (
    <div className="grid grid-cols-[2fr_1fr_auto_auto] gap-x-4 items-baseline">
      <Text component="label" size="sm" weight={500}>
        <span className="block mb-1">Interviewer</span>
        <SelectEmployee onChange={handleInterviewerChange} />
      </Text>
      <DatePicker value={interview.date} onChange={handleChange('date')} label="Date" />
      <TimeInput value={interview.time} onChange={handleChange('time')} label="Time" />
      <UnstyledButton className="place-self-stretch mt-5" onClick={() => removeInterview(dispatch, interview.id)}>
        <CrossIcon />
      </UnstyledButton>
    </div>
  );
}
