import React, { createContext, useReducer, ReactNode } from 'react';

// Define the interface for the context state
interface ContextState {
  current_user_id: number | null;
  current_user_name: string | null;
  jwt: string | null;
}

// Define the action types
type Action =
  | { type: 'SET_USER_ID', payload: number }
  | { type: 'SET_JWT', payload: string }
  | { type: 'SET_USER_NAME', payload: string };
// Define the reducer function

interface AppContextValue extends ContextState {
  dispatch: React.Dispatch<Action>;
}

export const AppReducer = (state: ContextState, action: Action): ContextState => {
  switch (action.type) {
    case 'SET_USER_ID':
      return {
        ...state,
        current_user_id: action.payload,
      };
    case 'SET_JWT':
      return {
        ...state,
        jwt: action.payload,
      };
    case 'SET_USER_NAME':
      return {
        ...state,
        current_user_name: action.payload,
      };
    default:
      return state;
  }
};

// Sets the initial state when the app loads
const initialState: ContextState = {
  current_user_id: null,
  current_user_name: null,
  jwt: null,
};

export const AppContext = createContext<AppContextValue>({} as AppContextValue);

type Reducer = React.Reducer<ContextState, Action>;

interface AppProviderProps {
  children: ReactNode;
}

// Create the context provider
export const AppProvider: React.FC<AppProviderProps> = ({children}) => {
  const [state, dispatch] = useReducer<Reducer>(AppReducer, initialState);

  return (
    <AppContext.Provider value={{
      current_user_id: state.current_user_id,
      current_user_name: state.current_user_name,
      jwt: state.jwt,
      dispatch,
    }}>
      {children}
    </AppContext.Provider>
  );
};
