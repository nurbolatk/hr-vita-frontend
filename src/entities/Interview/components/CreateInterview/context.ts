import React, { createContext, useContext } from 'react';

export type InterviewState = {
  id: number;
  interviewerId: number | null;
  date: Date | null;
  time: Date | null;
};

type Action =
  | {
      type: 'ADD';
    }
  | {
      type: 'REMOVE';
      payload: number;
    }
  | {
      type: 'CHANGE';
      payload: InterviewState;
    };

const newInterviewsReducer = (state: InterviewState[], action: Action): InterviewState[] => {
  switch (action.type) {
    case 'ADD':
      return state.length < 5
        ? [...state, { id: Date.now() * Math.random(), interviewerId: null, date: null, time: null }]
        : state;
    case 'REMOVE':
      return state.filter((inteview) => {
        return inteview.id !== action.payload;
      });
    case 'CHANGE':
      return state.map((item) => {
        if (item.id === action.payload.id) {
          return action.payload;
        }
        return item;
      });
    default:
      throw new Error('Invalid action for interviews reducer');
  }
};

const addNewInterview = (dispatch: React.Dispatch<Action>) => dispatch({ type: 'ADD' });
const removeInterview = (dispatch: React.Dispatch<Action>, id: number) => dispatch({ type: 'REMOVE', payload: id });
const changeInterview = (dispatch: React.Dispatch<Action>, interview: InterviewState) =>
  dispatch({
    type: 'CHANGE',
    payload: interview,
  });

const CreateInterviewContext = createContext<
  | {
      newInterviews: InterviewState[];
      dispatch: React.Dispatch<Action>;
      addNewInterview: typeof addNewInterview;
      removeInterview: typeof removeInterview;
      changeInterview: typeof changeInterview;
    }
  | undefined
>(undefined);
CreateInterviewContext.displayName = 'CreateInterviewContext';

export const useCreateInterview = () => {
  const value = useContext(CreateInterviewContext);
  if (!value) {
    throw new Error('useCreateInterview must be used inside CreateInterviewContextProvider');
  }

  return value;
};

export { newInterviewsReducer, CreateInterviewContext, addNewInterview, removeInterview, changeInterview };
