import { Button, Card, LoadingOverlay, Text } from '@mantine/core';
import { useAuth } from 'app/providers';
import { api, InterivewStatus, UpdateInterviewNOO } from 'entities/Interview';
import React from 'react';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { useIdParam } from 'shared/hooks';

export function InterviewDetails(): JSX.Element {
  const id = useIdParam();
  const { data: interview, isLoading } = useQuery(['interview', id], () => api.getOneById(id));
  const queryClient = useQueryClient();
  const updateStatus = useMutation((interviewNOO: UpdateInterviewNOO) => api.updateInterview(interviewNOO), {
    onSuccess: () => {
      queryClient.invalidateQueries(['interview', id]);
    },
  });
  const { user } = useAuth();
  return (
    <div>
      {interview && (
        <Card withBorder shadow="sm">
          <Text>{interview.name}</Text>
          <Text>
            <Text component="span" color="gray">
              Candidate:{' '}
            </Text>
            {interview.interviewee.firstName} {interview.interviewee.lastName}
          </Text>
          <Text>
            <Text component="span" color="gray">
              Time:{' '}
            </Text>
            {interview.datetime}
          </Text>
          <Text>
            <Text component="span" color="gray">
              Location:{' '}
            </Text>
            {interview.location}
          </Text>
          <Text>
            <Text component="span" color="gray">
              Status:{' '}
            </Text>
            {interview.statusText}
          </Text>

          {user && (user.id === interview.interviewer.id || user.isHR) && (
            <div className="mt-4 flex gap-x-4">
              <Button
                variant="default"
                color="gray"
                onClick={() => {
                  updateStatus.mutate({
                    ...interview,
                    intervieweeId: interview.interviewee.id,
                    interviewerId: interview.interviewer.id,
                    status: InterivewStatus.NOT_STARTED,
                  });
                }}>
                Interview Not Started
              </Button>
              <Button
                variant="light"
                color="red"
                onClick={() => {
                  updateStatus.mutate({
                    ...interview,
                    intervieweeId: interview.interviewee.id,
                    interviewerId: interview.interviewer.id,
                    status: InterivewStatus.FAILED,
                  });
                }}>
                Candidate failed
              </Button>
              <Button
                onClick={() => {
                  updateStatus.mutate({
                    ...interview,
                    intervieweeId: interview.interviewee.id,
                    interviewerId: interview.interviewer.id,
                    status: InterivewStatus.PASSED,
                  });
                }}>
                Candidate passed
              </Button>
            </div>
          )}
        </Card>
      )}
      <LoadingOverlay visible={isLoading} />
    </div>
  );
}
