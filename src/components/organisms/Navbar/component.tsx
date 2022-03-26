import React from 'react';
import { Link } from 'react-router-dom';
import { Modal, LoginForm } from 'components/organisms';
import { Button, Skeleton } from '@mantine/core';
import { useAuth } from 'app/providers';
import { iff } from 'utils';

export function Navbar(): JSX.Element {
  const { user, isAuthLoading, logout, isAuthSuccess } = useAuth();

  return (
    <header className="container flex justify-between md:justify-start items-center">
      <div className="text-3xl font-bold underline md:w-0 md:flex-1">
        <Link to="/">HR Vita</Link>
      </div>
      <ul className="flex items-center gap-x-4">
        <li>
          <Link to="/applications">Заявки</Link>
        </li>
        <li>
          <Link to="/cabinet">Мой кабинет</Link>
        </li>
      </ul>
      <ul className="md:w-0 md:flex-1 flex justify-end gap-x-4">
        <Modal>
          {user ? (
            <li>
              <Button variant="outline" onClick={logout}>
                Выйти
              </Button>
            </li>
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
