import { SuccessUserData } from './Types'


// Define the getUserData function
export default async function getUserData(user_id: number, Token: string): Promise<SuccessUserData> {
  try {
    const response = await fetch('http://127.0.0.1:8000/api/userdata', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${Token}`
      },
      body: JSON.stringify({ user_id: user_id }),
    });
    if (!response.ok) {
      throw new Error('Failed to get user data');
    }
    const userData: SuccessUserData = await response.json();
    return userData;
  } catch (error) {
    console.error('Get User data error:', error);
    throw error;
  }
}

