import { Alert, Button, Card, Timeline, Text, ActionIcon, LoadingOverlay, CardProps } from '@mantine/core';
import React, { useState } from 'react';

import { api, InterivewStatus, Interview } from 'entities/Interview';
import { AlertCircleIcon, CheckIcon, CircleIcon, CrossIcon, EditIcon } from 'shared/components/icons';
import { Modal } from 'shared/components/organisms';
import { ModalOpenButton } from 'shared/components/organisms/Modal/libs/ModalOpenButton';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { useIdParam } from 'shared/hooks';
import { InterviewDetailsModal } from '../InterviewDetailsModal';

export function InterviewsTimeline({ ...props }: Omit<CardProps<'div'>, 'children'>): JSX.Element {
  const id = useIdParam();
  const queryKey = ['interviews', id];
  const { data: interviews, isLoading } = useQuery<Interview[]>(queryKey, () => api.getAll(id));
  const [editing, setEditing] = useState<Interview | null>(null);
  const queryClient = useQueryClient();

  const deletion = useMutation((interviewId: number) => api.deleteInterview(interviewId), {
    onSuccess: () => {
      queryClient.invalidateQueries(queryKey);
    },
  });

  return (
    <Card
      withBorder
      shadow="sm"
      p="lg"
      sx={{
        overflow: 'visible',
        position: 'relative',
      }}
      {...props}>
      <div className="flex mb-3 items-center gap-x-4">
        <h3 className="text-xl">Interviews</h3>
      </div>

      <LoadingOverlay visible={isLoading} />
      {!isLoading && interviews && (
        <>
          {interviews.length === 0 && <Alert color="gray">No interviews are appointed</Alert>}
          <Modal>
            <Timeline bulletSize={24} lineWidth={2} className="mb-4">
              {interviews.map((interview) => (
                <Timeline.Item
                  key={interview.id}
                  bullet={
                    interview.status === InterivewStatus.NOT_STARTED ? (
                      <CircleIcon width={14} height={14} />
                    ) : interview.status === InterivewStatus.FAILED ? (
                      <CrossIcon width={14} height={14} />
                    ) : (
                      <CheckIcon width={14} height={14} />
                    )
                  }
                  color={
                    interview.status === InterivewStatus.NOT_STARTED
                      ? 'gray'
                      : interview.status === InterivewStatus.FAILED
                      ? 'red'
                      : 'teal'
                  }
                  title={interview.name}
                  active={interview.status !== InterivewStatus.NOT_STARTED}
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
                    <div className="flex gap-x-2">
                      <ModalOpenButton>
                        <ActionIcon size={20} onClick={() => setEditing(interview)}>
                          <EditIcon />
                        </ActionIcon>
                      </ModalOpenButton>
                      <Modal>
                        <Modal.OpenButton>
                          <ActionIcon size={20} color="red">
                            <CrossIcon />
                          </ActionIcon>
                        </Modal.OpenButton>
                        <Modal.Content title="Confirm action">
                          <Alert icon={<AlertCircleIcon />} color="red">
                            Are you sure you want to delete this interview?
                          </Alert>
                          <Modal.Actions>
                            <Modal.CloseButton>
                              <Button
                                size="sm"
                                sx={{
                                  opacity: 0.6,
                                }}
                                variant="default"
                                color="gray">
                                Cancel
                              </Button>
                            </Modal.CloseButton>
                            <Button size="sm" color="red" onClick={() => deletion.mutate(interview.id)}>
                              Delete
                            </Button>
                          </Modal.Actions>
                        </Modal.Content>
                      </Modal>
                    </div>
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
