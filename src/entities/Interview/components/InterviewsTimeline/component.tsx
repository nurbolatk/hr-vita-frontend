import { Alert, Button, Card, Timeline, Text, ActionIcon, TextInput } from '@mantine/core';
import React, { useReducer } from 'react';

import {
  addNewInterview,
  changeInterview,
  CreateInterview,
  CreateInterviewContext,
  InterviewState,
  newInterviewsReducer,
  removeInterview,
} from 'entities/Interview';
import { CheckCircleIcon, CheckIcon, DatabaseIcon, EditIcon } from 'shared/components/icons';
import { Modal } from 'shared/components/organisms';
import { ModalOpenButton } from 'shared/components/organisms/Modal/libs/ModalOpenButton';
import { SelectEmployee } from 'entities/Employee';
import { Props } from './props';
import { InterviewDetailsModal } from '../InterviewDetailsModal';

export function InterviewsTimeline({ defaultValue = [] }: Props): JSX.Element {
  const [newInterviews, dispatch] = useReducer(newInterviewsReducer, defaultValue);

  return (
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
          Save
        </Button>
      </div>

      <CreateInterviewContext.Provider
        value={{ newInterviews, dispatch, addNewInterview, removeInterview, changeInterview }}>
        <Modal>
          <Timeline active={0} bulletSize={24} lineWidth={2} className="mb-4">
            <Timeline.Item bullet={<CheckIcon width={14} height={14} />} title="Interview with HR" lineVariant="dashed">
              <div className="flex justify-between">
                <div>
                  <Text size="sm">Interviewer: Nurbolat Kenzhekulov</Text>
                  <Text variant="link" size="sm">
                    Location: Office 303
                  </Text>
                  <Text size="xs" mt={4}>
                    22nd March, 13:00 - 14:00
                  </Text>
                </div>
                <ModalOpenButton>
                  <ActionIcon size="sm">
                    <EditIcon />
                  </ActionIcon>
                </ModalOpenButton>
              </div>
            </Timeline.Item>

            <Timeline.Item title="First technical interview">
              <div className="flex justify-between">
                <Text color="dimmed" size="sm">
                  No interview created... Press edit icon &rarr;
                </Text>
                <ModalOpenButton>
                  <ActionIcon size="sm">
                    <EditIcon />
                  </ActionIcon>
                </ModalOpenButton>
              </div>
            </Timeline.Item>
          </Timeline>

          <Button fullWidth type="button" onClick={() => addNewInterview(dispatch)} disabled={newInterviews.length > 4}>
            Add more interviews
          </Button>
          {newInterviews.length === 0 && <Alert color="gray">No interviews are appointed</Alert>}
          {newInterviews.map((interview: InterviewState) => (
            <CreateInterview key={interview.id} interview={interview} />
          ))}

          <InterviewDetailsModal />
        </Modal>
      </CreateInterviewContext.Provider>
    </Card>
  );
}
