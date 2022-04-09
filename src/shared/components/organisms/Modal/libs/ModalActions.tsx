import React, { HTMLAttributes } from 'react';
import cn from 'classnames';

export function ModalActions({ className, ...rest }: HTMLAttributes<HTMLDivElement>) {
  return <div className={cn('flex gap-x-4 justify-end mt-4', className)} {...rest} />;
}
