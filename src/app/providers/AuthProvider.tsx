/* eslint-disable react/jsx-no-constructed-context-values */
import * as React from 'react';
import { GeneralError, LoginArguments, Session, User, WithChildren } from 'shared/types';
import { useAsync } from 'shared/hooks';
// import { useEffect } from 'react';
import * as auth from 'shared/helpers/auth-manager';

type AuthState = {
  user: User | null;
  token: string | null;
  login: (form: LoginArguments) => Promise<Session | null>;
  // register: (form: RegisterArguments) => Promise<User | null>;
  logout: () => void;
  // isAuthIdle: boolean;
  isAuthLoading: boolean;
  // isAuthError: boolean;
  isAuthSuccess: boolean;
  authError: GeneralError | null;
};

const AuthContext = React.createContext<AuthState | undefined>(undefined);

function AuthProvider({ children }: WithChildren) {
  const {
    data: user,
    setData,
    run,
    // isIdle: isAuthIdle,
    isLoading: isAuthLoading,
    // isError: isAuthError,
    isSuccess: isAuthSuccess,
    error: authError,
    dispatch,
  } = useAsync<Session>({
    status: 'pending',
  });

  React.useEffect(() => {
    const token = auth.getToken();
    if (!token) {
      dispatch({
        status: 'idle',
        data: null,
        error: null,
      });
    } else {
      auth
        .getUserByToken(token)
        .then((session: Session) => {
          setData(session);
        })
        .catch(() => {
          dispatch({
            status: 'idle',
            data: null,
            error: null,
          });
        });
    }
  }, [dispatch, setData]);

  // useEffect(() => {
  //   run(userModel.getUserByToken());
  // }, [run]);

  // const login = React.useCallback((form: LoginArguments) => run(userModel.login(form)), [run]);
  // const register = React.useCallback((form: RegisterArguments) => run(userModel.register(form)), [run]);
  const logout = React.useCallback(() => {
    auth.logout();
    setData(null);
  }, [setData]);

  const login = React.useCallback(
    async (form: LoginArguments) => {
      return run(auth.login(form));
    },
    [run]
  );

  return (
    // already memoized
    // eslint-disable-next-line react/jsx-no-constructed-context-values
    <AuthContext.Provider
      value={{
        user: user?.user ?? null,
        token: user?.token ?? null,
        login,
        // register,
        logout,
        // isAuthIdle,
        isAuthLoading,
        // isAuthError,
        isAuthSuccess,
        authError,
      }}>
      {children}
    </AuthContext.Provider>
  );
}

function useAuth() {
  const value = React.useContext(AuthContext);

  if (value === undefined) {
    throw new Error('useAuth can only be used inside AuthProvider');
  }

  return value;
}

export { AuthProvider, useAuth };
