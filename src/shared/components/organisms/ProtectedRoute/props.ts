import { Role } from 'entities/Session';

export type Props = {
  allowed?: Role[];
  prohibited?: Role[];
};
