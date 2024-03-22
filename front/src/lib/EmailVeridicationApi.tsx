import { backendurl } from './Backendpoint';

export async function VerifyEmailWithToken(JWTToken: string, token_id: string) {
  try {
    const response = await fetch(`${backendurl}api/confirm`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${JWTToken}`
      },
      body: JSON.stringify({token_id: token_id})

    });
    if (!response.ok) {
      throw new Error('Failed to send verification email');
    }

    return response.json();
  } catch (error) {
    // Handle error
    console.error('send verification email error:', error);
    throw error; // Rethrow the error to be caught by the caller
  }
}

export async function SendVerificationEmail(Token: string) {
  try {
    const response = await fetch(`${backendurl}api/sendverifyemail`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${Token}`
      },

    });
    if (!response.ok) {
      throw new Error('Failed to send verification email');
    }

    return response.json();
  } catch (error) {
    // Handle error
    console.error('send verification email error:', error);
    throw error; // Rethrow the error to be caught by the caller
  }
}
