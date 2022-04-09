import { Alert, Button, Card, Timeline, Text, ActionIcon, LoadingOverlay } from '@mantine/core';
import React, { useState } from 'react';

import { api, Interview } from 'entities/Interview';
import { CheckIcon, EditIcon } from 'shared/components/icons';
import { Modal } from 'shared/components/organisms';
import { ModalOpenButton } from 'shared/components/organisms/Modal/libs/ModalOpenButton';
import { useQuery } from 'react-query';
import { useIdParam } from 'shared/hooks';
import { InterviewDetailsModal } from '../InterviewDetailsModal';

export function InterviewsTimeline(): JSX.Element {
  const id = useIdParam();
  const { data: interviews, isLoading } = useQuery<Interview[]>(['interviews', id], () => api.getAll(id));
  const [editing, setEditing] = useState<Interview | null>(null);

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
      </div>

      <LoadingOverlay visible={isLoading} />
      {!isLoading && interviews && (
        <>
          {interviews.length === 0 && <Alert color="gray">No interviews are appointed</Alert>}
          <Modal>
            <Timeline active={0} bulletSize={24} lineWidth={2} className="mb-4">
              {interviews.map((interview) => (
                <Timeline.Item
                  key={interview.id}
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
                      <ActionIcon size={20} onClick={() => setEditing(interview)}>
                        <EditIcon />
                      </ActionIcon>
                    </ModalOpenButton>
                  </div>
                </Timeline.Item>
              ))}
            </Timeline>

            <Modal.OpenButton>
              <Button fullWidth type="button" disabled={interviews.length > 4}>
                {interviews.length < 5 ? 'Add more interviews' : 'No more interviews allowed'}
              </Button>
            </Modal.OpenButton>

            <InterviewDetailsModal defaultValue={editing} />
          </Modal>
        </>
      )}
    </Card>
  );
}
