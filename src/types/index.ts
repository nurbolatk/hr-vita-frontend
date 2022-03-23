export * from './GeneralError';
export * from './WithChildren';

export type LoginArguments = {
  identifier: string;
  password: string;
};
export type RegisterArguments = {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
};

export type User = {
  email: string;
};
