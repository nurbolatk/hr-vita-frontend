import { Alert, Button, Card, Timeline, Text, ActionIcon, LoadingOverlay, CardProps } from '@mantine/core';
import React, { useState } from 'react';
import { CheckIcon, CircleIcon, CrossIcon, EditIcon } from 'shared/components/icons';

import { Modal } from 'shared/components/organisms';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { useIdParam } from 'shared/hooks';
import { api, Approval, ApprovalStatus, UpdateApprovalDTO } from 'entities/Approval';
import { Employee, SelectEmployee } from 'entities/Employee';

export function ApprovalsTimeline({ ...props }: Omit<CardProps<'div'>, 'children'>): JSX.Element {
  const id = useIdParam();
  const queryKey = ['approvals', id];
  const { data: approvals, isLoading } = useQuery<Approval[]>(queryKey, () => api.getAll(id));
  const [editing, setEditing] = useState<boolean>(false);
  const queryClient = useQueryClient();
  const updating = useMutation((data: UpdateApprovalDTO) => api.update(data), {
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
        <h3 className="text-xl">Approvals</h3>
      </div>

      <LoadingOverlay visible={isLoading} />
      {!isLoading && approvals && (
        <>
          {approvals.length === 0 && <Alert color="gray">No approvals are appointed</Alert>}
          <Modal>
            <Timeline bulletSize={24} lineWidth={2} className="mb-4">
              {approvals.map((approval) => (
                <Timeline.Item
                  key={approval.id}
                  bullet={
                    approval.status === ApprovalStatus.PENDING ? (
                      <CircleIcon width={14} height={14} />
                    ) : approval.status === ApprovalStatus.REJECTED ? (
                      <CrossIcon width={14} height={14} />
                    ) : (
                      <CheckIcon width={14} height={14} />
                    )
                  }
                  color={
                    approval.status === ApprovalStatus.PENDING
                      ? 'gray'
                      : approval.status === ApprovalStatus.REJECTED
                      ? 'red'
                      : 'teal'
                  }
                  title={approval.department.name}
                  active={approval.status !== ApprovalStatus.PENDING}
                  lineVariant="dashed">
                  <div>
                    {approval.master ? (
                      <Text size="sm">
                        Approver: {approval.master?.firstName} {approval.master?.lastName}
                      </Text>
                    ) : editing ? (
                      <SelectEmployee
                        onChange={(newApprover: Employee | null) => {
                          if (newApprover) {
                            updating.mutate({
                              id: approval.id,
                              masterId: newApprover.id,
                            });
                          }
                        }}
                      />
                    ) : (
                      <Button variant="subtle" compact onClick={() => setEditing(true)}>
                        Select approver
                      </Button>
                    )}
                  </div>
                </Timeline.Item>
              ))}
            </Timeline>
          </Modal>
        </>
      )}
    </Card>
  );
}
