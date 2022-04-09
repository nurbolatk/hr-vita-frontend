import { Alert, Button, Card, Timeline, Text, ActionIcon, LoadingOverlay } from '@mantine/core';
import React, { useReducer } from 'react';

import { addNewInterview, api, Interview, newInterviewsReducer } from 'entities/Interview';
import { CheckIcon, EditIcon } from 'shared/components/icons';
import { Modal } from 'shared/components/organisms';
import { ModalOpenButton } from 'shared/components/organisms/Modal/libs/ModalOpenButton';
import { useQuery } from 'react-query';
import { useIdParam } from 'shared/hooks';
import { Props } from './props';
import { InterviewDetailsModal } from '../InterviewDetailsModal';

export function InterviewsTimeline({ defaultValue = [] }: Props): JSX.Element {
  const id = useIdParam();
  const { data: interviews, isLoading } = useQuery<Interview[]>(['interviews', id], () => api.getAll(id));

  const [newInterviews, dispatch] = useReducer(newInterviewsReducer, defaultValue);

  return (
    <Card
      withBorder
      shadow="sm"
      p="lg"
      sx={{
        overflow: 'visible',
        position: 'relative',
      }}>
      <div className="flex mb-3 items-center gap-x-4">
        <h3 className="text-xl">Interviews</h3>
        <Button
          size="xs"
          type="button"
          compact
          onClick={() => addNewInterview(dispatch)}
          disabled={interviews && interviews.length > 4}>
          Save
        </Button>
      </div>
      <LoadingOverlay visible={isLoading} />
      {!isLoading && interviews && (
        <>
          {interviews.length === 0 && <Alert color="gray">No interviews are appointed</Alert>}
          <Modal>
            <Timeline active={0} bulletSize={24} lineWidth={2} className="mb-4">
              {interviews.map((interview) => (
                <Timeline.Item
                  bullet={<CheckIcon width={14} height={14} />}
                  title={interview.name}
                  lineVariant="dashed">
                  <div className="flex justify-between">
                    <div>
                      <Text size="sm">
                        Interviewer: {interview.interviewer.firstName} {interview.interviewer.lastName}
                      </Text>
                      <Text color="blue" size="sm">
                        Location: {interview.location}
                      </Text>
                      <Text size="xs" weight={500} color="gray" mt={4}>
                        {interview.datetime}
                      </Text>
                    </div>
                    <ModalOpenButton>
                      <ActionIcon size={20}>
                        <EditIcon />
                      </ActionIcon>
                    </ModalOpenButton>
                  </div>
                </Timeline.Item>
              ))}
            </Timeline>

            <Button
              fullWidth
              type="button"
              onClick={() => addNewInterview(dispatch)}
              disabled={newInterviews.length > 4}>
              Add more interviews
            </Button>

            <InterviewDetailsModal />
          </Modal>
        </>
      )}
    </Card>
  );
}
