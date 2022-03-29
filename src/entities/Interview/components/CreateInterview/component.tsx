import React, { useState } from 'react';
import { Text } from '@mantine/core';

import { SelectEmployee } from 'entities/Employee';
import { DatePicker, TimeInput } from '@mantine/dates';

export function CreateInterview(): JSX.Element {
  const [date, onChangeDate] = useState<Date | null>(new Date());

  const [time, setTime] = useState<Date | null>(new Date());

  return (
    <div className="grid grid-cols-[2fr_1fr_auto] gap-x-4 items-baseline">
      <Text component="label" size="sm" weight={500}>
        <span className="block mb-1">Interviewer</span>
        <SelectEmployee />
      </Text>
      <DatePicker value={date} onChange={onChangeDate} label="Date" />
      <TimeInput value={time} onChange={setTime} label="Time" />
    </div>
  );
}
