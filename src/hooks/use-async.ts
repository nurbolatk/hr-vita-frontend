import { useLayoutEffect, Dispatch, useCallback, useReducer, useRef } from 'react';
import { GeneralError } from 'types';

type RequestStatus = 'idle' | 'pending' | 'resolved' | 'rejected';

type State<T> = {
  data: T | null;
  status: RequestStatus;
  error: GeneralError | null;
};

type Reducer<S> = (prevState: S, action: S) => S;

const defaultInitialState: State<never> = {
  data: null,
  status: 'idle',
  error: null,
};

// memoize dispatch from useReducer
function useSafeDispatch<T>(dispatch: Dispatch<State<T>>) {
  const mounted = useRef(false);

  useLayoutEffect(() => {
    mounted.current = true;
    return () => {
      mounted.current = false;
    };
  }, []);

  return useCallback((arg: State<T>) => (mounted.current ? dispatch(arg) : undefined), [dispatch]);
}

export function useAsync<T>(initialState?: Partial<State<T>>) {
  const initialStateRef = useRef<State<T>>({
    ...defaultInitialState,
    ...initialState,
  });
  const [{ data, status, error }, unsafeDispatch] = useReducer<Reducer<State<T>>>(
    (state, action) => ({ ...state, ...action }),
    initialStateRef.current
  );

  const dispatch = useSafeDispatch(unsafeDispatch);

  const setData = useCallback(
    (newData: T | null) => {
      if (newData === null) {
        dispatch({ status: 'idle', data: newData, error: null });
      } else {
        dispatch({ status: 'resolved', data: newData, error: null });
      }
    },
    [dispatch]
  );

  const setError = useCallback(
    (newError: GeneralError) => {
      if (newError === null) {
        dispatch({ status: 'idle', error: newError, data: null });
      } else {
        dispatch({ status: 'rejected', error: newError, data: null });
      }
    },
    [dispatch]
  );
  const reset = useCallback(() => dispatch(initialStateRef.current), [dispatch]);

  const run = useCallback(
    (promise: Promise<T | null>) => {
      if (!promise || !promise.then) {
        throw new Error('The argument passed to run must be a promise');
      }
      dispatch({ status: 'pending', data: null, error: null });
      return promise
        .then((result) => {
          setData(result);
          return Promise.resolve(result);
        })
        .catch((e) => {
          console.dir('async error?', e);

          setError(e);
          return Promise.reject(e);
        });
    },
    [dispatch, setData, setError]
  );

  return {
    isIdle: status === 'idle',
    isLoading: status === 'pending',
    isError: status === 'rejected',
    isSuccess: status === 'resolved',
    setData,
    setError,
    error,
    status,
    data,
    run,
    reset,
  };
}
