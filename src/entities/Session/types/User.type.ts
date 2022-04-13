export type User = {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  email: string;
  firstName: string;
  lastName: string;
  role: string;
  isHR: boolean;
};

export type UserResponse = {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  email: string;
  firstName: string;
  lastName: string;
  role: string;
};

export enum Role {
  HR = 'HR',
  USER = 'USER',
  ADMIN = 'ADMIN',
}
