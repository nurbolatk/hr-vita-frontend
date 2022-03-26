import React from 'react';
import { EyeOffIcon, EyeOpenIcon } from 'shared/components/icons';

export function VisibilityToggleIcon({ reveal, size }: { reveal: boolean; size: number }) {
  if (reveal) {
    return <EyeOpenIcon width={size} height={size} />;
  }
  return <EyeOffIcon width={size} height={size} />;
}
