import { client } from 'shared/helpers';
import { LoginArguments, RegisterArguments } from 'shared/types';
import { parseUser } from '../helper';
import { Session, SessionResponse, User, UserResponse } from '../types';

const localStorageKey = '__auth_provider_token__';

function getToken(): string | null {
  return window.localStorage.getItem(localStorageKey);
}

function handleUserResponse(session: SessionResponse): Session {
  window.localStorage.setItem(localStorageKey, session.token);
  return {
    token: session.token,
    user: parseUser(session.user),
  };
}

async function login(credentials: LoginArguments): Promise<Session> {
  const session = await client<SessionResponse>('auth/signin', { data: credentials });
  return handleUserResponse(session);
}

async function register(credentials: RegisterArguments): Promise<Session> {
  const session = await client<SessionResponse>('auth/signup', { data: credentials });
  return handleUserResponse(session);
}

async function getUserByToken(token: string): Promise<Session> {
  const user = await client<UserResponse>('users/me', { token });
  return {
    token,
    user: parseUser(user),
  };
}

async function logout() {
  await window.localStorage.removeItem(localStorageKey);
}

async function changePassword(email: string, password: string) {
  return client('users/change-password', {
    data: {
      email,
      password,
    },
  });
}

export { login, register, logout, getToken, getUserByToken, changePassword };
