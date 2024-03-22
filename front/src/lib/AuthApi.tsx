import { backendurl } from './Backendpoint';

export async function LoginApi(email_username: string, password: string) {
  try {
    const response = await fetch(`${backendurl}api/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email_username:email_username, password: password }),
    });
    if (!response.ok) {
      throw new Error('Failed to login');
    }

    return response.json();
  } catch (error) {
    // Handle error
    console.error('Login error:', error);
    throw error; // Rethrow the error to be caught by the caller
  }
}
interface ReturnMessage {
  username?: string;
  message?: string;
}

export async function RegisterApi(email: string,
                                  username: string,
                                  password: string,
                                  password2: string): Promise<ReturnMessage> {

  return fetch(`${backendurl}api/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email: email,
      username: username,
      password: password,
      password2: password2
    }),
  }).then(data => data.json());
}

export async function PingServer(Token: string): Promise<void> {
  try {
    const response = await fetch(`${backendurl}api/currentuser`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${Token}`
      },
    });
    if (!response.ok) {
      throw new Error('Failed to Ping server');
    }
    return;
  } catch (error) {
    console.error('Ping server error:', error);
    throw error;
  }
}


