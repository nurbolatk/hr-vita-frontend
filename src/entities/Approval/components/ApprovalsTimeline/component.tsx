import { ActionIcon, Alert, Button, Card, CardProps, LoadingOverlay, Text, Timeline } from '@mantine/core';
import { api, Approval, ApprovalStatus, CreateApprovalDTO, UpdateApprovalDTO } from 'entities/Approval';
import { SelectDepartment } from 'entities/Department';
import { Employee, SelectEmployee } from 'entities/Employee';
import React, { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { AlertCircleIcon, CheckIcon, CircleIcon, CrossIcon, EditIcon, TrashIcon } from 'shared/components/icons';
import { Modal } from 'shared/components/organisms';
import { useIdParam } from 'shared/hooks';
import { GeneralError } from 'shared/types';

export function ApprovalsTimeline({ ...props }: Omit<CardProps<'div'>, 'children'>): JSX.Element {
  const id = useIdParam();
  const queryKey = ['approvals', id];
  const { data: approvals, isLoading } = useQuery<Approval[]>(queryKey, () => api.getAll(id));
  const [editing, setEditing] = useState<number>(-1);
  const queryClient = useQueryClient();
  const updating = useMutation((data: UpdateApprovalDTO) => api.update(data), {
    onSuccess: () => {
      queryClient.invalidateQueries(queryKey);
    },
  });
  const deleting = useMutation((approvalId: number) => api.deleteOne(approvalId), {
    onSuccess: () => {
      queryClient.invalidateQueries(queryKey);
    },
  });
  const creation = useMutation<Approval, GeneralError, CreateApprovalDTO>(
    (body: CreateApprovalDTO) => api.createOne(body),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(queryKey);
      },
    }
  );

  const { handleSubmit, control, setValue } = useForm<{
    department: string;
  }>();
  const [approver, setApprover] = useState<Employee | null>(null);

  const { t } = useTranslation();

  const onNewApprovalSubmit = (data: { department: string }) => {
    if (approver) {
      creation.mutate({ department: data.department, masterId: approver.id, candidateId: id });
    }
  };

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
        <h3 className="text-xl">{t('Approvals')}</h3>
      </div>

      <LoadingOverlay visible={isLoading} />
      {!isLoading && approvals && (
        <>
          {approvals.length === 0 && <Alert color="gray">{t('No approvals are appointed')}</Alert>}

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
                {editing === approval.id ? (
                  <div className="flex items-center gap-x-2">
                    <SelectEmployee
                      defaultValue={approval.master?.id}
                      onChange={(newApprover: Employee | null) => {
                        if (newApprover) {
                          updating.mutate({
                            id: approval.id,
                            masterId: newApprover.id,
                          });
                          setEditing(-1);
                        }
                      }}
                    />
                    <ActionIcon size="sm" onClick={() => setEditing(-1)}>
                      <CrossIcon />
                    </ActionIcon>
                  </div>
                ) : (
                  <div className="flex items-center gap-x-3">
                    {approval.master ? (
                      <Text size="sm">
                        {t('Approver')}: {approval.master?.firstName} {approval.master?.lastName}
                      </Text>
                    ) : (
                      <Text size="sm">{t('No approver')}</Text>
                    )}
                    <ActionIcon className="ml-auto" size="sm" color="teal" onClick={() => setEditing(approval.id)}>
                      <EditIcon />
                    </ActionIcon>
                    <Modal>
                      <Modal.Content title="Confirm action">
                        <Alert icon={<AlertCircleIcon />} color="red">
                          {t('Are you sure you want to delete this?')}
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
                              {t('Cancel')}
                            </Button>
                          </Modal.CloseButton>
                          <Button size="sm" color="red" onClick={() => deleting.mutate(approval.id)}>
                            {t('Delete')}
                          </Button>
                        </Modal.Actions>
                      </Modal.Content>
                      <Modal.OpenButton>
                        <ActionIcon size="sm" color="red">
                          <TrashIcon />
                        </ActionIcon>
                      </Modal.OpenButton>
                    </Modal>
                  </div>
                )}
              </Timeline.Item>
            ))}
          </Timeline>
          <Modal>
            <Modal.Content title={t('Confirmation')}>
              <form onSubmit={handleSubmit(onNewApprovalSubmit)}>
                {creation.isError && (
                  <Alert color="red" title={t('Error creating approval')}>
                    {creation.error.message}
                  </Alert>
                )}
                <Controller
                  control={control}
                  name="department"
                  rules={{ required: 'Надо выбрать' }}
                  render={({ field: { value, onChange }, fieldState: { error } }) => {
                    return (
                      <SelectDepartment setValue={setValue} value={value} onChange={onChange} error={error?.message} />
                    );
                  }}
                />

                <Text component="label" size="sm" weight={500}>
                  <span className="block mb-1 mt-3">{t('Approver')}</span>
                  <SelectEmployee onChange={(app) => setApprover(app)} />
                </Text>

                <Modal.Actions>
                  <Modal.CloseButton>
                    <Button
                      size="sm"
                      sx={{
                        opacity: 0.6,
                      }}
                      variant="default"
                      color="gray">
                      {t('Cancel')}
                    </Button>
                  </Modal.CloseButton>
                  <Button size="sm" type="submit">
                    {t('Save')}
                  </Button>
                </Modal.Actions>
              </form>
            </Modal.Content>
            <Modal.OpenButton>
              <Button fullWidth type="button">
                {t('Add approval')}
              </Button>
            </Modal.OpenButton>
            <Modal.CloseOn condition={creation.isSuccess} />
          </Modal>
        </>
      )}
    </Card>
  );
}
