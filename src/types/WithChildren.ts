import * as React from 'react';

export type WithChildren<T = React.ReactNode> = {
  children: T;
};
