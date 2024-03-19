import { SuccessUserData, ConnectionData, Pos, Action } from './lib/Types'





export const sendCurrentId = (id: string):Action  =>{
  return({
    type: 'SET_USER_ID',
    payload: id
  })
}

export const sendCurrentUsername = (username: string):Action =>{
  return({
    type: 'SET_USER_NAME',
    payload: username
  })
}

export const sendJWT = (JWT: string): Action =>{
  return({
    type: 'SET_JWT',
    payload: JWT
  })
}

export const clickedUser = (data: SuccessUserData): Action => {
  return({
    type: 'SET_CLICKED_USER',
    payload: data
  })
}

export const clickedConnection = (connection_id: ConnectionData): Action => {
  return({
    type: 'SET_CLICKED_CONNECTION',
    payload: connection_id
  })
}

export const sendWorkSpacePos = (pos: Pos): Action =>{
  return({
    type: 'SET_WORKSPACE_POS',
    payload: pos
  })
}

export const openMenu = (): Action =>{
  return({
    type: 'OPEN_MENU',
  })
}


export const closeMenu = (): Action =>{
  return({
    type: 'CLOSE_MENU',
  })
}

export const addShowedUser = (User: string): Action =>{
  return({
    type: 'ADD_SHOWED_USER',
    payload: User,
  })
}

export const removeShowedUser = (User: string): Action =>{
  return({
    type: 'REMOVE_SHOWED_USER',
    payload: User,
  })
}
