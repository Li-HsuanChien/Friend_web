import { Url } from 'url';

export type Closeness= 'friend' | 'closefriend' | 'bestfriend'

export interface ConnectionData {
  id: string,
  date_established: string,
  closeness: Closeness,
  nicknamechildtoparent?: string,
  nicknameparenttochild?: string,
  inviter: string,
  invitee: string,
  activated: boolean,
}

export type Gender = 'M' | 'F' | 'N' | 'NA';
// Define the SuccessUserData interface
export interface SuccessUserData {
  username: string;
  username_id: string;
  bio: string | null;
  headshot: Url | null;
  gender: Gender;
  date_of_birth: string;
  show_horoscope: boolean;
  instagram_link: string | null;
  facebook_link: string | null;
  snapchat_link: string | null;
  inviteurl: Url;
  created_time: string;
}

export interface Pos{
  posx:number,
  posy:number,
}
export type Action =
| { type: 'SET_USER_ID', payload: string }
| { type: 'SET_JWT', payload: string }
| { type: 'SET_USER_NAME', payload: string }
| { type: 'SET_CLICKED_USER', payload: SuccessUserData}
| { type: 'SET_CLICKED_CONNECTION', payload: ConnectionData }
| { type: 'SET_CSRF_TOKEN', payload: string}
| { type: 'SET_WORKSPACE_POS', payload:Pos}
| { type: 'OPEN_MENU'}
| { type: 'CLOSE_MENU'}
| { type: 'ADD_SHOWED_USER', payload: string}
| { type: 'REMOVE_SHOWED_USER', payload: string}

export interface SearchedUser{
  username: string,
  headshot: Url,
  username_id: string
}

export interface Message{
  message: string;
}
