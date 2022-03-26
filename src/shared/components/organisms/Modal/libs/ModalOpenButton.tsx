import * as React from 'react';
import { WithChildren } from 'shared/types';
import { callAll } from 'shared/utils';
import { useModalState } from '../context';

export function ModalOpenButton({ children }: WithChildren<React.ReactElement>): JSX.Element {
  const { openModal } = useModalState();
  return React.cloneElement(children, {
    onClick: callAll(openModal, children.props.onClick),
  });
}
