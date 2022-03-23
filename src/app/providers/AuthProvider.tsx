/* eslint-disable react/jsx-no-constructed-context-values */
import * as React from 'react';
import { LoginArguments, RegisterArguments, GeneralError, User, WithChildren } from 'types';
import { useAsync } from 'hooks';
// import { useEffect } from 'react';
import * as auth from 'helpers/auth-manager';

type AuthState = {
  user: User | null;
  // login: (form: LoginArguments) => Promise<User | null>;
  // register: (form: RegisterArguments) => Promise<User | null>;
  // logout: () => void;
  // isAuthIdle: boolean;
  // isAuthLoading: boolean;
  // isAuthError: boolean;
  // isAuthSuccess: boolean;
  // authError: GeneralError | null;
};

const AuthContext = React.createContext<AuthState | undefined>(undefined);

function AuthProvider({ children }: WithChildren) {
  const {
    data: user,
    run,
    setData,
    isIdle: isAuthIdle,
    isLoading: isAuthLoading,
    isError: isAuthError,
    isSuccess: isAuthSuccess,
    error: authError,
  } = useAsync<User>({
    status: 'pending',
  });

  // useEffect(() => {
  //   run(userModel.getUserByToken());
  // }, [run]);

  // const login = React.useCallback((form: LoginArguments) => run(userModel.login(form)), [run]);
  // const register = React.useCallback((form: RegisterArguments) => run(userModel.register(form)), [run]);
  const logout = React.useCallback(() => {
    auth.logout();
    setData(null);
  }, [setData]);

  return (
    // already memoized
    // eslint-disable-next-line react/jsx-no-constructed-context-values
    <AuthContext.Provider
      value={{
        user,
        // login,
        // register,
        // logout,
        // isAuthIdle,
        // isAuthLoading,
        // isAuthError,
        // isAuthSuccess,
        // authError,
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
