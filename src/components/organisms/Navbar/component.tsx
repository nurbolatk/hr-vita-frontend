import React from 'react';
import { Link } from 'react-router-dom';

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
        <li>
          <Link to="/login">Войти</Link>
        </li>
        <li>
          <Link to="/register">Регистрация</Link>
        </li>
      </ul>
    </header>
  );
}
