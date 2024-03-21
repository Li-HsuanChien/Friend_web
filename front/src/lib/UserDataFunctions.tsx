import { SuccessUserData } from './Types'
import { backendurl } from './Backendpoint';


// Define the getUserData function
export async function getUserData(user_id: string, Token: string): Promise<SuccessUserData> {
  try {
    const response = await fetch(`${backendurl}api/userdata`, {
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

interface jwt{
  refresh: string,
  access: string
}

export async function UserCreate(gender: string, date_of_birth: string, show_horoscope: boolean, Token: string, image?: File): Promise<jwt>{
  try{
    const formData = new FormData();
    const pythonBoolean = show_horoscope ? 'True': 'False';
    formData.append('show_horoscope', pythonBoolean);
    formData.append('gender', gender);
    formData.append('date_of_birth', date_of_birth);
    if(image)formData.append('headshot', image);
    const response = await fetch(`${backendurl}api/userdatas/add`, {
      method: 'POST',
      headers: {
        // No need for Content-Type here, as it will be automatically set
        'Authorization': `Bearer ${Token}`
      },
      body: formData,
    });

    if(!response.ok){
      console.log('user not added! something went wrong')
    }
    const jwt = await response.json();
    return jwt;
  } catch (error) {
    console.error('Add User data error:', error);
    throw error;
  }
}

export async function UserUpdate(Token: string,
                               bio?: string,
                               gender?: string,
                               date_of_birth?: string,
                               show_horoscope?: boolean,
                               instagram_link?: string,
                               facebook_link?: string,
                               snapchat_link?: string,
                               image?: File): Promise<SuccessUserData>{
  try{
    const formData = new FormData();
    if(show_horoscope){
      const pythonBoolean = show_horoscope ? 'True': 'False';
      pythonBoolean && formData.append('show_horoscope', pythonBoolean);
    }
    if(gender) formData.append('gender', gender);
    if(date_of_birth) formData.append('date_of_birth', date_of_birth);
    if(image) formData.append('headshot', image);
    if(bio) formData.append('bio', bio);
    if(instagram_link) formData.append('instagram_link', instagram_link);
    if(facebook_link) formData.append('facebook_link', facebook_link);
    if(snapchat_link) formData.append('snapchat_link', snapchat_link);

    const response = await fetch(`${backendurl}api/userdatas/update`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${Token}`
      },
      body: formData,
    });

    if(!response.ok){
      console.log('user not successfully updated! something went wrong!')
    } else console.log('probably editted');
    return response.json();
  } catch (error) {
    console.error('Add User data error:', error);
    throw error;
  }
}
