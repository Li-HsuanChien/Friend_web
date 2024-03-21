import {ConnectionData, Message, Closeness} from './Types'
import { backendurl } from './Backendpoint';
export async function getActivatedConnection(user_id: string, Token: string): Promise<ConnectionData[]> {
  try {
    const response = await fetch(`${backendurl}api/connections/activated`, {
      credentials: 'include',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${Token}`
      },
      body: JSON.stringify({ user_id: user_id }),
    });
    if (!response.ok) {
      throw new Error('Failed to get user connection')
    }
    const connections: ConnectionData[] = await response.json();
    return connections;
  } catch (error) {
    console.error('Get connection error:', error);
    throw error;
  }
}

export async function getPendingConnection(user_id: string, Token: string): Promise<ConnectionData[]> {
  try {
    const response = await fetch(`${backendurl}api/connections/pending`, {
      credentials: 'include',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${Token}`
      },
      body: JSON.stringify({ user_id: user_id }),
    });
    if (!response.ok) {
      throw new Error('Failed to get user connection')
    }
    const connections: ConnectionData[] = await response.json();
    return connections;
  } catch (error) {
    console.error('Get connection error:', error);
    throw error;
  }
}
export async function ConnectionCreate(Token: string, invitee_id: string): Promise<ConnectionData> {
  try {
    const response = await fetch(`${backendurl}api/connections/add`, {
      credentials: 'include',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${Token}`
      },
      body: JSON.stringify({ invitee_id: invitee_id }),
    });
    if (!response.ok) {
      throw new Error('Failed to add connection')
    }
    const connections: ConnectionData = await response.json();
    return connections;
  } catch (error) {
    console.error('Add connection error:', error);
    throw error;
  }
}

export async function ConnectionGet(connection_id: string, Token: string): Promise<ConnectionData> {
  try {
    const response = await fetch(`${backendurl}api/connections/self`, {
      credentials: 'include',
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${Token}`
      },
      body: JSON.stringify({ connection_id: connection_id }),
    });
    if (!response.ok) {
      throw new Error('Failed to get target connection')
    }
    const connections: ConnectionData = await response.json();
    return connections;
  } catch (error) {
    console.error('Get target connection error:', error);
    throw error;
  }
}

export async function ConnectionDelete(connection_id: string, Token: string): Promise<Message> {
  try {
    const response = await fetch(`${backendurl}api/connections/self`, {
      credentials: 'include',
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${Token}`
      },
      body: JSON.stringify({ connection_id: connection_id }),
    });
    if (!response.ok) {
      throw new Error('Failed to delete target connection')
    }
    const connections: Message = await response.json();
    return connections;
  } catch (error) {
    console.error('delete target connection error:', error);
    throw error;
  }
}
interface ConnectionBody{
  connection_id: string,
  activated: 'True'|'False',
  closeness?: Closeness,
  nickname?: string
}
export async function ConnectionUpdate(connection_id: string,
                                       Token: string,
                                       closeness?: Closeness,
                                       nickname?: string): Promise<ConnectionData> {
  try {
    const body: ConnectionBody = {connection_id: connection_id, activated: 'True'};
    if(closeness) body.closeness = closeness;
    if(nickname) body.nickname = nickname;
    const response = await fetch(`${backendurl}connections/self `, {
      credentials: 'include',
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${Token}`
      },
      body: JSON.stringify(body),
    });
    if (!response.ok) {
      throw new Error('Failed to edit target connection')
    }
    const connections: ConnectionData = await response.json();
    return connections;
  } catch (error) {
    console.error('Edit target connection error:', error);
    throw error;
  }
}
