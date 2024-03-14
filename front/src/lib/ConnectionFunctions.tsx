import {ConnectionData, Message, Closeness} from './Types'
//TBD connection activated and unactivated endpoint
export async function getConnection(user_id: number, Token: string): Promise<ConnectionData[]> {
  try {
    const response = await fetch('http://127.0.0.1:8000/api/connections', {
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
export async function ConnectionCreate(closeness: string, Token: string, invitee_id: number): Promise<ConnectionData[]> {
  try {
    const response = await fetch('http://127.0.0.1:8000/api/connections/add', {
      credentials: 'include',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${Token}`
      },
      body: JSON.stringify({ closeness: closeness, invitee_id: invitee_id }),
    });
    if (!response.ok) {
      throw new Error('Failed to add connection')
    }
    const connections: ConnectionData[] = await response.json();
    return connections;
  } catch (error) {
    console.error('Add connection error:', error);
    throw error;
  }
}

export async function ConnectionGet(connection_id: number, Token: string): Promise<ConnectionData> {
  try {
    const response = await fetch('http://127.0.0.1:8000/api/connections/self', {
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

export async function ConnectionDelete(connection_id: number, Token: string): Promise<Message> {
  try {
    const response = await fetch('http://127.0.0.1:8000/api/connections/self', {
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
// """_summary_
//         edits single self connection,
//         takes user's side to determine whether edit nicknametochild or parent and closness
//     Args:
//         self.request.data.get('connection_id')
//         self.request.data.get('closeness'):
//             ('friend', 'Friend')
//             ('closefriend', 'Close Friend')
//             ('bestfriend', 'Best Friend')
//         self.request.data.get('nickname')
//         Example2(PUT):{"connection_id": "2",
//                     "nickname": "edited nick name",
//                     "closeness": "bestfriend"
//                  }
//     Returns:
//         Example2: {
//                 "id": 2,
//                 "date_established": "2024-02-20T20:32:46.863427Z",
//                 "closeness": "bestfriend",
//                 "nicknamechildtoparent": "edited nick name",
//                 "nicknameparenttochild": null,
//                 "activated": false,
//                 "inviter": 9,
//                 "invitee": 10
//             }
//     """
interface ConnectionBody{
  connection_id: number,
  activated: 'True'|'False',
  closeness?: Closeness,
  nickname?: string
}
export async function ConnectionUpdate(connection_id: number,
                                       Token: string,
                                       closeness?: Closeness,
                                       nickname?: string): Promise<ConnectionData> {
  try {
    const body: ConnectionBody = {connection_id: connection_id, activated: 'True'};
    if(closeness) body.closeness = closeness;
    if(nickname) body.nickname = nickname;
    const response = await fetch('http://127.0.0.1:8000/api/connections/self', {
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
