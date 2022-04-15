export type User = {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  email: string;
  firstName: string;
  lastName: string;
  role: Role;
  isHR: boolean;
};

export type UserResponse = {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  email: string;
  firstName: string;
  lastName: string;
  role: Role;
};

export enum Role {
  HR = 'HR',
  USER = 'USER',
  ADMIN = 'ADMIN',
}
