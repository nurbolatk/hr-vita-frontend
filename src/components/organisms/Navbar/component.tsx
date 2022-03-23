import React from 'react';
import { Link } from 'react-router-dom';

export function Navbar(): JSX.Element {
  return (
    <header className="">
      <div className="text-3xl font-bold underline">
        <Link to="/">HR Vita</Link>
      </div>
      <ul>
        <li>
          <Link to="/login">Sign in</Link>
        </li>
        <li>
          <Link to="/register">Sign up</Link>
        </li>
      </ul>
    </header>
  );
}
