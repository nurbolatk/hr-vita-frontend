import { useAuth } from 'app/providers';
import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { isAllowedTo } from 'shared/helpers';
import { Props } from './props';

export function ProtectedRoute({ allowed, prohibited }: Props): React.ReactElement | null {
  const { user, isAuthLoading } = useAuth();
  const location = useLocation();

  if (isAuthLoading) return null;

  if (!user) {
    console.warn('No user!');

    // Redirect them to the /login page, but save the current location they were
    // trying to go to when they were redirected. This allows us to send them
    // along to that page after they login, which is a nicer user experience
    // than dropping them off on the home page.
    return <Navigate to="/home" state={{ from: location }} replace />;
  }
  if (!isAllowedTo(user, allowed, prohibited)) {
    console.warn('Not allowed!');
    return <Navigate to="/home" state={{ from: location }} replace />;
  }

  return <Outlet />;
}
