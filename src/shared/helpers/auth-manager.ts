import { client } from 'shared/helpers';
import { LoginArguments, RegisterArguments, Session, User } from 'shared/types';

const localStorageKey = '__auth_provider_token__';

function getToken(): string | null {
  return window.localStorage.getItem(localStorageKey);
}

function saveToken(session: Session): void {
  window.localStorage.setItem(localStorageKey, session.token);
}

async function login(credentials: LoginArguments): Promise<Session> {
  const session = await client<Session>('auth/signin', { data: credentials });
  saveToken(session);
  return session;
}

async function register(credentials: RegisterArguments): Promise<Session> {
  const session = await client<Session>('auth/signup', { data: credentials });
  saveToken(session);
  return session;
}

async function getUserByToken(token: string) {
  const user = await client<User>('users/me', { token });
  return {
    token,
    user,
  };
}

async function logout() {
  await window.localStorage.removeItem(localStorageKey);
}

export { login, register, logout, getToken, getUserByToken };
