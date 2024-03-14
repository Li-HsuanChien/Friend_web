/* eslint-disable node/no-unpublished-import */
import React, {useState, useContext} from 'react';
import { styled } from 'styled-components';
import {useNavigate, Link} from 'react-router-dom';
import {ChangeEvent} from 'react';
import { AppContext } from '../../AppContext';
import { sendCurrentId, sendJWT, sendCurrentUsername } from '../../actions';
import { getUserData } from '../../lib/UserDataFunctions';

const LoginStyle = styled.div`

  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #080710;

  .background {
    width: 430px;
    height: 520px;
    position: absolute;
    transform: translate(-50%, -50%);
    left: 50%;
    top: 50%;
  }

  .background .shape {
    height: 200px;
    width: 200px;
    position: absolute;
    border-radius: 50%;
  }

  .shape:first-child {
    background: linear-gradient(#dfe1e4, #b7b7b8);
    left: -80px;
    top: -80px;
  }

  .shape:last-child {
    background: linear-gradient(to right, #dfe1e4, #b7b7b8);
    right: -30px;
    bottom: -80px;
  }

  form {
    height: 400px;
    width: 400px;
    background-color: rgba(255, 255, 255, 0.13);
    position: absolute;
    transform: translate(-50%, -50%);
    top: 50%;
    left: 50%;
    border-radius: 10px;
    backdrop-filter: blur(10px);
    border: 2px solid rgba(255, 255, 255, 0.1);
    box-shadow: 0 0 40px rgba(8, 7, 16, 0.6);
    padding: 50px 35px;
  }

  form * {
    font-family: 'Poppins', sans-serif;
    color: #ffffff;
    letter-spacing: 0.5px;
    outline: none;
    border: none;
  }

  form h3 {
    font-size: 32px;
    font-weight: 500;
    line-height: 42px;
    text-align: center;
  }

  form p {
    text-align: center;
    margin-top: 15px;
    margin-bottom: 10px;
    font-size: 13px;
  }

  label {
    display: block;
    margin-top: 30px;
    font-size: 16px;
    font-weight: 500;
  }

  input {
    display: block;
    height: 50px;
    width: 100%;
    background-color: rgba(255, 255, 255, 0.07);
    border-radius: 3px;
    padding: 0 10px;
    margin-top: 8px;
    font-size: 14px;
    font-weight: 300;
  }

  // input:-webkit-autofill { 
  //   -webkit-box-shadow:200px 200px 100px black inset; 
  //   box-shadow:200px 200px 100px white inset; 
  // }

  ::placeholder {
    color: #e5e5e5;
  }

  button {
    margin-top: 50px;
    width: 100%;
    background-color: #ffffff;
    color: #080710;
    padding: 15px 0;
    font-size: 18px;
    font-weight: 600;
    border-radius: 5px;
    cursor: pointer;
  }
`
const ForgotLink = styled(Link)`
  display: block;
  text-align: right;
`
const SignLink = styled(Link)`
  display: block;
  text-align: left;
`
interface Credentials {
  username: string
  password: string
}
interface successMessage {
  refresh: string,
  access: string
}
interface errorMessage {
  detail: string
}
type ReturnMessage = successMessage | errorMessage;

async function LoginApi(credentials: Credentials) {
  try {
    const response = await fetch('http://127.0.0.1:8000/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials),
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
interface pingSuccessResponse{
  username:string,
  id: number
}
async function PingServer(Token: string): Promise<pingSuccessResponse> {
  try {
    const response = await fetch('http://127.0.0.1:8000/api/currentuser', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${Token}`
      },
    });
    if (!response.ok) {
      throw new Error('Failed to ping server');
    }
    return response.json();
  } catch (error) {
    // Handle error
    console.error('Ping server error:', error);
    throw error; // Rethrow the error to be caught by the caller
  }
}

const Login = () => {
  const navigate = useNavigate();
  const {dispatch} = useContext(AppContext);
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [loginState, setLoginState] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response: ReturnMessage = await LoginApi({
        username: username,
        password: password,
      });
      if ('refresh' in response) {
        const {refresh , access} = response;
        //debug
        // console.log(refresh);
        // console.log(access);
        window.localStorage.setItem('JWTToken', access);
        dispatch(sendJWT(access));
        PingServer(response.access)
          .then((result) => {
            const { username, id } = result;
            // console.log(`got id ${id}`);
            // console.log(`got username ${username}`);
            dispatch(sendCurrentId(id));
            dispatch(sendCurrentUsername(username));
            setLoginState('Welcome!');
            getUserData(id, access as string)
            .then(() => {
              navigate('/');
            })
            .catch(() =>{
              navigate('/add');
            })
          })
      } else {
        setLoginState(response.detail);
      }
    } catch (error) {
      setLoginState(`Something went Wrong! ${error}`);
      console.error(error)
      return;
    }
  };

  return (
    <>
      <LoginStyle>
        <div className="background">
          <div className="shape"></div>
          <div className="shape"></div>
        </div>

        <form onSubmit={handleSubmit}>
          <h3>Login</h3>

          <label htmlFor="username">Username</label>
          <input
            required
            type="text"
            placeholder="Username"
            id="username"
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              setUsername(e.target.value);
            }}
          />

          <label htmlFor="password">Password</label>
          <input
            required
            type="password"
            placeholder="Password"
            id="password"
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              setPassword(e.target.value);
            }}
          />
          <ForgotLink to="/password">Forgot password</ForgotLink>
          {loginState && <p>{loginState}</p>}
          <button
            type="submit"
            style={{marginTop: loginState ? '5px' : '20px'}}
          >Log In</button>
          <SignLink to="/register">Sign up!</SignLink>
        </form>
      </LoginStyle>
    </>
  );
};

export default Login;
