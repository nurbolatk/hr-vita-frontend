import { client } from 'helpers';
import { LoginArguments, RegisterArguments, User } from 'types';

const localStorageKey = '__auth_provider_token__';

function getToken(): string | null {
  return window.localStorage.getItem(localStorageKey);
}

function handleAuthResponse(session: User) {
  window.localStorage.setItem(localStorageKey, session.email);
  return session;
}

function getUserFromToken(token: string) {
  return client<User>('users/me', { token });
}

// I have to refetch user after login because STRAPI does not send 'role' in login
async function login(credentials: LoginArguments): Promise<User> {
  const response = await client<User>('auth/local', { data: credentials });
  const user = await getUserFromToken(response.email);
  handleAuthResponse(response);
  return user;
}

// I have to refetch user after login because STRAPI does not send 'role' in register
async function register(credentials: RegisterArguments): Promise<User> {
  const response = await client<User>('auth/local/register', { data: credentials });
  const user = await getUserFromToken(response.email);
  handleAuthResponse(response);
  return user;
}

async function logout() {
  await window.localStorage.removeItem(localStorageKey);
}

export { login, register, logout, getToken, getUserFromToken };
