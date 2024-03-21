import { backendurl } from './Backendpoint';

export async function SendResetLink(email: string) {
  try {
    const response = await fetch(`${backendurl}api/forgotpassword`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({email:email}),
    });
    if (!response.ok) {
      throw new Error('Failed to send reset link');
    }
    return response.json();
  } catch (error) {
    console.error('Failed to send reset link:', error);
    throw error;
  }
}

export async function SendResetPassword(password_token: string, password: string, password2: string) {
  try {
    const response = await fetch(`${backendurl}api/resetpassword`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({password: password, password2: password2, password_token:password_token}),
    });
    if (!response.ok) {
      throw new Error('Failed to reset password');
    }
    return response.json();
  } catch (error) {
    console.error('Failed to reset password', error);
    throw error;
  }
}
