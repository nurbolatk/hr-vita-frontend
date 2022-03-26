import * as React from 'react';
import { WithChildren } from 'shared/types';
import { callAll } from 'shared/utils';
import { useModalState } from '../context';

export function ModalCloseButton({ children }: WithChildren<React.ReactElement>): JSX.Element {
  const { closeModal } = useModalState();
  return React.cloneElement(children, {
    onClick: callAll(closeModal, children.props.onClick),
  });
}
