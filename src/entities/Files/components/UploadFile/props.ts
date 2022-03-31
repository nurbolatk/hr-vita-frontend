import { UserDocument } from 'entities/Files';

export type Props = {
  uploaded: UserDocument | null;
  setUploaded: (newFile: UserDocument | null) => void;
};
