import * as React from 'react';
import { WithChildren } from 'types/WithChildren';

type ModalState = {
  show: boolean;
  openModal: () => void;
  closeModal: () => void;
};

const ModalContext = React.createContext<ModalState | undefined>(undefined);

function useModalState(): ModalState {
  const values = React.useContext(ModalContext);
  if (values === undefined) {
    throw new Error('useModalState must be used inside ModalContext');
  }
  return values;
}

function ModalProvider({ children }: WithChildren): JSX.Element {
  const [show, setShow] = React.useState<boolean>(false);

  const closeModal = React.useCallback(() => {
    setShow(false);
  }, []);
  const openModal = React.useCallback(() => {
    setShow(true);
  }, []);

  return (
    // no need to memoize primitive useState values
    // eslint-disable-next-line react/jsx-no-constructed-context-values
    <ModalContext.Provider value={{ show, openModal, closeModal }}>{children}</ModalContext.Provider>
  );
}

export { ModalProvider, useModalState };
