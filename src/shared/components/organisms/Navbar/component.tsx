import { Badge, Button, Skeleton, Text } from '@mantine/core';
import { useAuth } from 'app/providers';
import { api, Notification } from 'entities/Notifications';
import { LoginForm } from 'entities/Session';
import React from 'react';
import { useQuery } from 'react-query';
import { Link } from 'react-router-dom';
import { Modal } from 'shared/components/organisms';
import { iff } from 'shared/utils';

export function Navbar(): JSX.Element {
  const { user, token, isAuthLoading, logout, isAuthSuccess } = useAuth();
  const isHr = user?.role === 'HR';

  const notifications = useQuery<Notification[]>(['notifications', user?.id], () => api.getAll(token), {
    enabled: !!user?.id && !!token,
  });

  const unreadCount = notifications.data?.reduce((acc, cur) => {
    return cur.unread ? acc + 1 : acc;
  }, 0);

  return (
    <header className="container flex justify-between md:justify-start items-center">
      <div className="md:w-0 md:flex-1">
        <Text component="h1" color="teal" weight={500}>
          <Link to="/">HR Vita</Link>
        </Text>
      </div>
      <ul className="flex items-center gap-x-4">
        <li>
          <Link to="/">Главная</Link>
        </li>
        {isHr && (
          <>
            <li>
              <Link to="/recruiting">Recruiting</Link>
            </li>
            <li>
              <Link to="/employees">Employees</Link>
            </li>
          </>
        )}
      </ul>
      <ul className="md:w-0 md:flex-1 flex justify-end gap-x-4 items-center">
        <Modal>
          {user ? (
            <>
              <li>
                <Link to="/cabinet">Мой кабинет</Link>
              </li>

              <li>
                <Link to="events" className="flex items-center gap-x-1">
                  <span>Events</span>
                  {unreadCount && (
                    <Badge variant="filled" color="red" size="xs" radius="xl">
                      {unreadCount}
                    </Badge>
                  )}
                </Link>
              </li>
              <li>
                <Button variant="outline" compact onClick={logout}>
                  Выйти
                </Button>
              </li>
            </>
          ) : (
            iff(
              isAuthLoading,
              <li>
                <Skeleton height={24} width={128} visible />
              </li>,
              <li>
                <Modal.OpenButton>
                  <Button compact variant="filled" size="sm">
                    Войти
                  </Button>
                </Modal.OpenButton>
              </li>
            )
          )}
          <Modal.Content title="Log in" className="max-w-md">
            <LoginForm />
          </Modal.Content>
          <Modal.CloseOn condition={isAuthSuccess} />
        </Modal>
      </ul>
    </header>
  );
}
