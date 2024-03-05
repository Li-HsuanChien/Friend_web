import { Url } from 'url';


// Define the Gender type
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

