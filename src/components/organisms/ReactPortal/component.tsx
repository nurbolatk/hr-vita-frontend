import * as React from 'react';
import ReactDOM from 'react-dom';
import { createWrapperAndAppendToBody } from 'utils';
import { Props } from './props';

export function ReactPortal({ children, wrapperId }: Props): JSX.Element | null {
  const [container, setContainer] = React.useState<HTMLElement | null>(null);

  React.useLayoutEffect(() => {
    let wrapperElement = document.getElementById(wrapperId);
    let elementCreated = false;
    if (!wrapperElement) {
      elementCreated = true;
      wrapperElement = createWrapperAndAppendToBody(wrapperId);
    }

    setContainer(wrapperElement);

    return () => {
      if (elementCreated && wrapperElement) {
        wrapperElement.remove();
      }
    };
  }, [wrapperId]);

  if (container === null) return null;

  return ReactDOM.createPortal(children, container);
}
