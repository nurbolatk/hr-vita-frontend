import { useAuth } from 'app/providers';
import React from 'react';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { api, Notification } from 'entities/Notifications';
import { Accordion, Alert, Anchor, Badge, Card, Title } from '@mantine/core';
import { Link } from 'react-router-dom';

export function EventsRoute() {
  // 1. fetch interviews assigned to this person
  // 2. count upcoming events
  const { user, token } = useAuth();
  const queryClient = useQueryClient();
  const notifications = useQuery<Notification[]>(['notifications', user?.id], () => api.getAll(token), {
    enabled: !!user?.id && !!token,
  });

  const mutation = useMutation((id: number) => api.updateNotification(id), {
    onSuccess: () => {
      queryClient.invalidateQueries(['notifications', user?.id]);
    },
  });

  return (
    <section>
      <Title order={2} className="mb-4">
        Notifications
      </Title>
      <Card withBorder p={0} shadow="sm">
        {!notifications.data?.length && <Alert color="gray">No notifications </Alert>}
        <Accordion
          multiple
          iconPosition="right"
          onChange={(state) => {
            Object.entries(state).forEach(([index, opened]) => {
              if (opened) {
                const i = parseInt(index, 10);
                if (notifications.data?.[i]) {
                  if (notifications.data[i].unread) {
                    mutation.mutate(notifications.data[i].id);
                  }
                }
              }
            });
          }}>
          {notifications.data?.map((notification) => (
            <Accordion.Item
              key={notification.id}
              label={
                <div className="flex items-center gap-x-2">
                  {notification.unread && <Badge color="blue">Unread</Badge>}
                  {notification.title}
                </div>
              }>
              <p>{notification.content}</p>
              {notification.linkAction && (
                <Anchor<typeof Link> component={Link} to={notification.linkAction.to}>
                  {notification.linkAction.label}
                </Anchor>
              )}
            </Accordion.Item>
          ))}
        </Accordion>
      </Card>
    </section>
  );
}
