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


interface RegisterInfo {
  email: string|undefined;
  username: string|undefined;
  password: string|undefined;
  password2: string|undefined;
}

interface ReturnMessage {
  username?: string;
  message?: string;
}

export async function RegisterApi(credentials: RegisterInfo): Promise<ReturnMessage> {
  return fetch(`${backendurl}register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(credentials),
  }).then(data => data.json());
}


