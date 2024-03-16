import React, { createContext, useReducer, ReactNode, useEffect } from 'react';
import {SuccessUserData, ConnectionData, Pos, Action} from './lib/Types'

// Define the interface for the context state
interface ContextState {
  // current_user_id: number | null,
  // current_user_name: string | null,
  // jwt: string | null,
  csrf: string | null,
  clickeduser: SuccessUserData | null,
  clickedconnection: ConnectionData | null,
  workspacepos: Pos | null,
  menustate: boolean | null,
  shownuserstate: Set<number> | null,
}


// Define the reducer function
export const AppReducer = (state: ContextState, action: Action): ContextState => {
  switch (action.type) {
    // case 'SET_USER_ID':
    //   return {
    //     ...state,
    //     current_user_id: action.payload,
    //   };
    // case 'SET_JWT':
    //   return {
    //     ...state,
    //     jwt: action.payload,
    //   };
    // case 'SET_USER_NAME':
    //   return {
    //     ...state,
    //     current_user_name: action.payload,
    //   };
    case 'SET_CSRF_TOKEN':
      return{
        ...state,
        csrf: action.payload,
      }
    case 'SET_CLICKED_USER':
      //console.log('User Clicked', action.payload)
      return{
        ...state,
        clickeduser: action.payload,
        clickedconnection: null
      }
    case 'SET_CLICKED_CONNECTION':
      // console.log('Connection Clicked', action.payload)
      return{
        ...state,
        clickedconnection: action.payload,
        clickeduser: null
      }
    case 'SET_WORKSPACE_POS':
      return{
        ...state,
        workspacepos: action.payload,
      }
    case 'OPEN_MENU':
      // console.log('Open Menu')
      return{
        ...state,
        menustate: true,
        clickedconnection: null,
        clickeduser: null,
      }
      case 'CLOSE_MENU':
      // console.log('Close Menu')
        return{
          ...state,
          menustate: false,
          clickedconnection: null,
          clickeduser: null,
        }
      case 'ADD_SHOWED_USER':{
        const newShownUserState = new Set<number>(state.shownuserstate);
        // console.log('add oringinal', newShownUserState)
        newShownUserState.add(action.payload);
        // console.log('add result', newShownUserState)
        return{
          ...state,
          shownuserstate: newShownUserState,
        }
      }
      case 'REMOVE_SHOWED_USER':{
        const newShownUserState = new Set<number>(state.shownuserstate);
        // console.log('remove oringinal', newShownUserState)
        newShownUserState.delete(action.payload);
        // console.log('remove result', newShownUserState)
        return{
          ...state,
          shownuserstate: newShownUserState,
        }
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
  // current_user_id: null,
  // current_user_name: null,
  // jwt: (window.localStorage.getItem('JWTToken'))? (window.localStorage.getItem('JWTToken')) : null,
  csrf: null,
  clickeduser:null,
  clickedconnection:null,
  workspacepos:{posx:50, posy:50},
  menustate: null,
  shownuserstate: new Set<number>(),
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
