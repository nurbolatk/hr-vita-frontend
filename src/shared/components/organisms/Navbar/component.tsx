import { Button, Skeleton, Text } from '@mantine/core';
import { useAuth } from 'app/providers';
import { LoginForm } from 'entities/Session';
import React from 'react';
import { Link } from 'react-router-dom';
import { Modal } from 'shared/components/organisms';
import { iff } from 'shared/utils';

export function Navbar(): JSX.Element {
  const { user, isAuthLoading, logout, isAuthSuccess } = useAuth();
  const isHr = user?.role === 'HR';

  return (
    <header className="container flex justify-between md:justify-start items-center">
      <div className="md:w-0 md:flex-1">
        <Text component="h1" color="teal" weight={500}>
          <Link to="/">HR Vita</Link>
        </Text>
      </div>
      <ul className="flex items-center gap-x-4">
        {isHr && (
          <li>
            <Link to="/applications">Заявки</Link>
          </li>
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
                <Button variant="outline" onClick={logout}>
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
                  <Button variant="filled" size="sm">
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
