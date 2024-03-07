import React, { createContext, useReducer, ReactNode, useEffect } from 'react';


interface Pos{
  posx:number,
  posy:number,
}
// Define the interface for the context state
interface ContextState {
  current_user_id: number | null;
  current_user_name: string | null;
  jwt: string | null;
  csrf: string | null;
  clickeduser: number | null;
  clickeconnection: number | null;
  workspacepos: Pos | null
}

// Define the action types
type Action =
  | { type: 'SET_USER_ID', payload: number }
  | { type: 'SET_JWT', payload: string }
  | { type: 'SET_USER_NAME', payload: string }
  | { type: 'SET_CSRF_TOKEN', payload: string }
  | { type : 'SET_CLICKED_USER', payload: number}
  | { type: 'SET_CLICKED_CONNECTION', payload: number }
  | { type: 'SET_WORKSPACE_POS', payload:Pos};

// Define the reducer function
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
    case 'SET_CSRF_TOKEN':
      return{
        ...state,
        csrf: action.payload as string | null,
      }
    case 'SET_CLICKED_USER':
      return{
        ...state,
        clickeduser: action.payload as number | null,
      }
    case 'SET_CLICKED_CONNECTION':
      return{
        ...state,
        clickeconnection: action.payload as number | null,
      }
    case 'SET_WORKSPACE_POS':
      return{
        ...state,
        workspacepos: action.payload as Pos | null,
      }
    default:
      return state;
  }
};

function getCSRFToken() {
  // Split the cookie string into individual cookies
  const cookies = document.cookie.split(';');

  // Iterate over the cookies to find the CSRF token cookie
  for (let i = 0; i < cookies.length; i++) {
    const cookie = cookies[i].trim();
    // Check if the cookie starts with the name of your CSRF token cookie
    if (cookie.startsWith('csrftoken=')) {
      // Extract the value of the CSRF token
      return cookie.substring('csrftoken='.length, cookie.length);
    }
  }

  // Return null if the CSRF token cookie is not found
  return null;
}

interface AppContextValue extends ContextState {
  dispatch: React.Dispatch<Action>;
}

const initialState: ContextState = {
  current_user_id: null,
  current_user_name: null,
  jwt: null,
  csrf: null,
  clickeduser:null,
  clickeconnection:null,
  workspacepos:null
};

export const AppContext = createContext<AppContextValue>({} as AppContextValue);

type Reducer = React.Reducer<ContextState, Action>;

interface AppProviderProps {
  children: ReactNode;
}

// Create the context provider
export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer<Reducer>(AppReducer, initialState);

  useEffect(() => {
    // Fetch CSRF token after the initial render
    const csrfToken = getCSRFToken();
    // Update the context with the retrieved CSRF token
    dispatch({ type: 'SET_CSRF_TOKEN', payload: csrfToken as string});
  }, []); // Run this effect only once after the initial render

  return (
    <AppContext.Provider value={{
      ...state,
      dispatch,
    }}>
      {children}
    </AppContext.Provider>
  );
};
