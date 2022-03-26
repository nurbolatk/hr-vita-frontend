export * from './GeneralError.type';
export * from './WithChildren';
export * from './User.type';
export * from './Session.type';

export type LoginArguments = {
  email: string;
  password: string;
};
export type RegisterArguments = {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
};
