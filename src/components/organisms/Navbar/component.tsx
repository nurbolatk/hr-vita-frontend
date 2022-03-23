import { Button } from '@mantine/core';
import React from 'react';
import { Link } from 'react-router-dom';
import { Modal } from 'components/organisms/Modal';

export function Navbar(): JSX.Element {
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
          <li>
            <Modal.OpenButton>
              <Button variant="outline" size="sm">
                Войти
              </Button>
            </Modal.OpenButton>
          </li>
          <Modal.Content title="Log in" className="max-w-md">
            <form>
              <input type="text" />
            </form>
          </Modal.Content>
        </Modal>
      </ul>
    </header>
  );
}
