import { UserDocument } from 'entities/Files';
import { Dispatch, SetStateAction } from 'react';

export type Props = {
  uploaded: UserDocument[];
  setUploaded: (up: UserDocument[]) => void;
};
