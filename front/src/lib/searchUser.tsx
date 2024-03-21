import { SearchedUser } from './Types'
import { backendurl } from './Backendpoint';

export async function searchUser(search: string, Token: string): Promise<SearchedUser[]> {
  try {
    const response = await fetch(`${backendurl}api/search`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${Token}`
      },
      body: JSON.stringify({ search: search }),
    });
    if (!response.ok) {
      throw new Error('Failed to get search query');
    }
    const userData: SearchedUser[] = await response.json();
    return userData;
  } catch (error) {
    console.error('Get User data error:', error);
    throw error;
  }
}
