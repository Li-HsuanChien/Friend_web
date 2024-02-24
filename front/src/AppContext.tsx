import React, { createContext, useReducer, ReactNode } from 'react';

// Define the interface for the context state
interface ContextState {
  current_user_id: number | null;
  jwt: string | null;
}

// Define the action types
type Action =
  | { type: 'SET_USER_ID'; payload: number }
  | { type: 'SET_JWT'; payload: string };

// Define the reducer function
export const AppReducer = (state: ContextState, action: Action): ContextState => {
  const {type, payload} = action
  switch (type) {
    case 'SET_USER_ID':
      return {
        ...state,
        current_user_id: payload,
      };
    case 'SET_JWT':
      return {
        ...state,
        jwt: payload,
      };
    default:
      return state;
  }
};

// Sets the initial state when the app loads
const initialState: ContextState = {
  current_user_id: null,
  jwt: null,
};

// Create the context
export const AppContext = createContext<ContextState | undefined>(undefined);

interface AppProviderProps {
  children: ReactNode; // ReactNode type allows any JSX to be passed as children
}
// Create the context provider
export const AppProvider: React.FC<AppProviderProps> = ({children}) => {
  const [state, dispatch] = useReducer(AppReducer, initialState);

  return (
    <AppContext.Provider value={{
      current_user_id: state.current_user_id ,
      jwt: state.jwt
    }}>
      {children}
    </AppContext.Provider>
  );
};
