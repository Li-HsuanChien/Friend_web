import {ConnectionData} from './Types'

export default async function getConnection(user_id: number, Token: string): Promise<ConnectionData[]> {
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
    console.error('Get User data error:', error);
    throw error;
  }
}
