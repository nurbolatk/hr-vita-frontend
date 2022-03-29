import React, { useState } from 'react';
import { Text, UnstyledButton } from '@mantine/core';

import { SelectEmployee } from 'entities/Employee';
import { DatePicker, TimeInput } from '@mantine/dates';
import { CrossIcon } from 'shared/components/icons';
import { InterviewDto, useCreateInterview } from 'entities/Candidate';

export function CreateInterview({ interview }: { interview: InterviewDto }): JSX.Element {
  const { removeInterview, dispatch } = useCreateInterview();

  const [date, onChangeDate] = useState<Date | null>(new Date());

  const [time, setTime] = useState<Date | null>(new Date());

  return (
    <div className="grid grid-cols-[2fr_1fr_auto_auto] gap-x-4 items-baseline">
      <Text component="label" size="sm" weight={500}>
        <span className="block mb-1">Interviewer</span>
        <SelectEmployee />
      </Text>
      <DatePicker value={date} onChange={onChangeDate} label="Date" />
      <TimeInput value={time} onChange={setTime} label="Time" />
      <UnstyledButton className="place-self-stretch mt-5" onClick={() => removeInterview(dispatch, interview.id)}>
        <CrossIcon />
      </UnstyledButton>
    </div>
  );
}
