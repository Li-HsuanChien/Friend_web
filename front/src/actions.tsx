type Action =
  | { type: 'SET_USER_ID', payload: number }
  | { type: 'SET_JWT', payload: string }
  | { type: 'SET_USER_NAME', payload: string };

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
