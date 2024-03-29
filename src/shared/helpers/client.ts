/* eslint-disable no-nested-ternary */
import { GeneralError } from 'shared/types';
// import { auth } from 'entities/Session';

const api = process.env.REACT_APP_BACKEND_URL;

type ClientOptions = Partial<
  {
    data: unknown;
    token: string;
    queryParams: URLSearchParams | string;
  } & RequestInit
>;

function transformError(error: GeneralError | string): GeneralError {
  if (typeof error === 'string') {
    return { message: error };
  }
  return error;
}

function handleAuthError(error?: GeneralError | string): Promise<GeneralError> {
  // auth.logout();
  // window.location.assign('/');
  return Promise.reject(error ? transformError(error) : { message: 'Token expired' });
}

export const client = async <T>(endpoint: string, options?: ClientOptions): Promise<T> => {
  const { data, token, queryParams, headers: customHeaders, ...customConfig } = options ?? {};

  const body = data ? JSON.stringify(data) : undefined;
  const config = {
    method: data ? 'POST' : 'GET',
    body,
    headers: {
      Authorization: token ? `Bearer ${token}` : '',
      'Content-Type': data ? 'application/json' : '',
      ...customHeaders,
    },
    ...customConfig,
  };

  const query = queryParams ? `?&${queryParams?.toString()}` : '';

  return window.fetch(`${api}/${endpoint}${query}`, config).then(async (response) => {
    if (response.status === 401) {
      return handleAuthError();
    }
    const responseData = await response.json();

    if (response.ok) {
      return responseData;
    }

    return Promise.reject(transformError(responseData ?? { message: `Error fetching ${endpoint}` }));
  });
};
