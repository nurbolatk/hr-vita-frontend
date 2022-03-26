import * as React from 'react';
import { WithChildren } from 'shared/types';
import { ModalProvider } from './context';
import { ModalContent } from './libs/ModalContent';
import { ModalOpenButton } from './libs/ModalOpenButton';
import { ModalCloseButton } from './libs/ModalCloseButton';
import { CloseModalOn } from './libs/CloseModalOn';

function Modal({ children }: WithChildren): JSX.Element {
  return <ModalProvider>{children}</ModalProvider>;
}

Modal.OpenButton = ModalOpenButton;
Modal.CloseButton = ModalCloseButton;
Modal.Content = ModalContent;
Modal.CloseOn = CloseModalOn;

export { Modal };
