import { callAll } from 'shared/utils';
import { useEffect } from 'react';
import { useModalState } from '../context';

type Props = {
  condition: boolean;
  onClose?: () => void;
};

export function CloseModalOn({ condition, onClose }: Props): null {
  const { closeModal } = useModalState();
  useEffect(() => {
    if (condition) {
      callAll(closeModal, onClose)();
    }
  }, [closeModal, condition, onClose]);
  return null;
}
