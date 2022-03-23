import * as React from 'react';
import { HTMLAttributes, KeyboardEventHandler, MouseEventHandler, useCallback } from 'react';
import cn from 'classnames';
import { WithChildren } from 'types';
import { ReactPortal } from 'components/organisms/ReactPortal';
import { CrossIcon } from 'components/icons';
import FocusTrap from 'focus-trap-react';
import { useModalState } from '../context';

type Props = {
  title?: string;
} & WithChildren &
  HTMLAttributes<HTMLDivElement>;

export function ModalContent({ children, title, className, ...rest }: Props) {
  const { show, closeModal } = useModalState();

  const handleKeyDown = useCallback<KeyboardEventHandler>(
    (event) => {
      if (event.key === 'Escape') {
        closeModal();
      }
    },
    [closeModal]
  );

  const handleClickOutside = useCallback<MouseEventHandler>(
    (event) => {
      if (event.target instanceof HTMLElement) {
        const isOutside = !(event.target as HTMLElement).closest('.modal-content');
        if (isOutside) {
          closeModal();
        }
      }
    },
    [closeModal]
  );

  return (
    <ReactPortal wrapperId="modal-portal">
      <FocusTrap active={show}>
        {/* we have to use div */}
        {/* eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions */}
        <div
          className={cn('modal', { 'opacity-100 pointer-events-auto': show })}
          role="dialog"
          aria-modal="true"
          tabIndex={-1}
          onClick={handleClickOutside}
          onKeyDown={handleKeyDown}>
          <div className={cn('modal-content', className, { 'translate-y-0': show })} {...rest}>
            <div className="flex justify-between mb-4">
              <h3>{title}</h3>
              <button type="button" onClick={closeModal}>
                <CrossIcon />
              </button>
            </div>
            <div>{children}</div>
          </div>
        </div>
      </FocusTrap>
    </ReactPortal>
  );
}
