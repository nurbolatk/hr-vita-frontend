import { Modal, useMantineTheme } from '@mantine/core';
import * as React from 'react';
import type { ModalProps } from '@mantine/core';
import { callAll, Optional } from 'shared/utils';
import { useModalState } from '../context';

type Props = Optional<Omit<ModalProps, 'opened'>, 'onClose'>;

export function ModalContent({ children, title, className, onClose, ...rest }: Props) {
  const { show, closeModal } = useModalState();
  const theme = useMantineTheme();

  return (
    <Modal
      title={title}
      onClose={callAll(onClose, closeModal)}
      opened={show}
      size="lg"
      centered
      overlayColor={theme.colorScheme === 'dark' ? theme.colors.dark[9] : theme.colors.gray[2]}
      overlayOpacity={0.95}
      {...rest}>
      {children}
    </Modal>
  );
}
