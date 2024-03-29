import { Button, Card, LoadingOverlay, Text } from '@mantine/core';
import { useAuth } from 'app/providers';
import { api, ApprovalStatus, UpdateApprovalDTO } from 'entities/Approval';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { useIdParam } from 'shared/hooks';

export function ApprovalDetails(): JSX.Element {
  const id = useIdParam();
  const { data: approval, isLoading } = useQuery(['approval', id], () => api.getOneById(id));

  const queryClient = useQueryClient();
  const updateStatus = useMutation((approvalNOO: UpdateApprovalDTO) => api.update(approvalNOO), {
    onSuccess: () => {
      queryClient.invalidateQueries(['approval', id]);
    },
  });

  const { user } = useAuth();
  const { t } = useTranslation();
  return (
    <div>
      {approval && (
        <Card withBorder shadow="sm">
          <Text>
            <Text component="span" color="gray">
              {t('Candidate')}:{' '}
            </Text>
            {approval.candidate.firstName} {approval.candidate.lastName}
          </Text>
          <Text>
            <Text component="span" color="gray">
              {t('Position')}:{' '}
            </Text>
            {approval.candidate.position.name}
          </Text>
          <Text>
            <Text component="span" color="gray">
              {t('Department')}:{' '}
            </Text>
            {approval.candidate.department.name}
          </Text>
          <Text>
            <Text component="span" color="gray">
              {t('Salary')}:{' '}
            </Text>
            {approval.candidate.salary}
          </Text>
          <Text>
            <Text component="span" color="gray">
              {t('Status')}:{' '}
            </Text>
            {approval.status.toLowerCase()}
          </Text>

          {user && (user.id === approval.master?.id || user.isHR) && (
            <div className="mt-4 flex gap-x-4">
              <Button
                variant="default"
                color="gray"
                onClick={() => {
                  updateStatus.mutate({
                    id: approval.id,
                    status: ApprovalStatus.PENDING,
                  });
                }}>
                {t('Reset')}
              </Button>
              <Button
                variant="light"
                color="red"
                onClick={() => {
                  updateStatus.mutate({
                    id: approval.id,
                    status: ApprovalStatus.REJECTED,
                  });
                }}>
                {t('Reject')}
              </Button>
              <Button
                onClick={() => {
                  updateStatus.mutate({
                    id: approval.id,
                    status: ApprovalStatus.APPROVED,
                  });
                }}>
                {t('Approve')}
              </Button>
            </div>
          )}
        </Card>
      )}
      <LoadingOverlay visible={isLoading} />
    </div>
  );
}
