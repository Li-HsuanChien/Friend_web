type Action =
  | { type: 'SET_USER_ID', payload: number }
  | { type: 'SET_JWT', payload: string }
  | { type: 'SET_USER_NAME', payload: string }
  | { type: 'SET_CLICKED_USER', payload: number}
  | { type: 'SET_CLICKED_CONNECTION', payload: number }

export const sendCurrentId = (id: number):Action  =>{
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

export const clickedUser = (user_id: number): Action => {
  return({
    type: 'SET_CLICKED_USER',
    payload: user_id
  })
}

export const clickedConnection = (connection_id: number): Action => {
  return({
    type: 'SET_CLICKED_CONNECTION',
    payload: connection_id
  })
}
