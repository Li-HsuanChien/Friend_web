import { Url } from 'url';

export interface ConnectionData {
  id: number,
  date_established: string,
  closeness: string,
  nicknamechildtoparent?: string,
  nicknameparenttochild?: string,
  inviter: number,
  invitee: number,
}

export type Gender = 'M' | 'F' | 'N' | 'NA';
// Define the SuccessUserData interface
export interface SuccessUserData {
  username: string;
  bio: string | null;
  headshot: Url | null;
  gender: Gender;
  date_of_birth: string;
  show_horoscope: boolean;
  instagram_link: Url | null;
  facebook_link: Url | null;
  snapchat_link: Url | null;
  inviteurl: Url;
  created_time: string;
}

export interface Pos{
  posx:number,
  posy:number,
}
export type Action =
| { type: 'SET_USER_ID', payload: number }
| { type: 'SET_JWT', payload: string }
| { type: 'SET_USER_NAME', payload: string }
| { type: 'SET_CLICKED_USER', payload: SuccessUserData}
| { type: 'SET_CLICKED_CONNECTION', payload: ConnectionData }
| { type: 'SET_CSRF_TOKEN', payload: string}
| { type: 'SET_WORKSPACE_POS', payload:Pos}
| { type: 'OPEN_MENU'}
| { type: 'CLOSE_MENU'}
| { type: 'ADD_SHOWED_USER', payload: number}
| { type: 'REMOVE_SHOWED_USER', payload: number}

