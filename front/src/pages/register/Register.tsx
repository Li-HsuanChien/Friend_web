import React, {useState} from 'react';
// eslint-disable-next-line node/no-unpublished-import
import {useNavigate, Link} from 'react-router-dom';
import {ChangeEvent} from 'react';
import {styled} from 'styled-components';


const RegisterStyle = styled.div`

  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #080710;

  .background {
    width: 430px;
    height: 600px;
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
    height: 500px;
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
    padding: 40px 35px;
  }

  form * {
    font-family: 'Poppins', sans-serif;
    color: #ffffff;
    letter-spacing: 0.5px;
    outline: none;
    border: none;
  }

  form p {
    font-family: 'Poppins', sans-serif;
    color: #ffffff;
    text-align: center;
    margin-top: 15px;
  }

  form h3 {
    font-size: 32px;
    font-weight: 500;
    line-height: 20px;
    text-align: center;
  }

  a {
    text-align: center;
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
`;

interface RegisterInfo {
  username: string | undefined;
  password: string | undefined;
  password2: string | undefined;
}

interface ReturnMessage {
  username?: string;
  message?: string;
}

async function RegisterApi(credentials: RegisterInfo) {
  return fetch('http://127.0.0.1:8000/api/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(credentials),
  }).then(data => data.json());
}

const sleep = (ms: number) => new Promise(r => setTimeout(r, ms));

const Register = () => {
  const navigate = useNavigate();
  const [username, setUserName] = useState<string>();
  const [password, setPassword] = useState<string>();
  const [password2, setPassword2] = useState<string>();
  const [registrationState, setRegistrationState] = useState<string | null>(
    null
  );

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      if(password !== password2){
        setRegistrationState('password does not match!')
      } else {const response: ReturnMessage = await RegisterApi({
        username: username,
        password: password,
        password2: password2,
      });
      if (response.username) {
        setRegistrationState(`Welcome! ${response.username}!`);
        sleep(3000);
        navigate('/login');
        return;
      } else {
        setRegistrationState(`Something went wrong! ${response.message}`);
        return;
      }
    }} catch (error) {
      setRegistrationState(`Something went Wrong! Try again ${error}`);
      return;}
  };

  return (
    <>
      <RegisterStyle>
        <div className="background">
          <div className="shape"></div>
          <div className="shape"></div>
        </div>

        <form onSubmit={handleSubmit}>
          <h3>Register</h3>

          <label htmlFor="username">Username</label>
          <input
            type="text"
            placeholder="Username"
            id="username"
            required
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setUserName(e.target.value)
            }
          />

          <label htmlFor="password">Password</label>
          <input
            type="password"
            placeholder="Password"
            id="password"
            required
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setPassword(e.target.value)
            }
          />

          <label htmlFor="password2">Confirm Password</label>
          <input
            type="password"
            placeholder="Confirm Password"
            id="password2"
            required
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setPassword2(e.target.value)
            }
          />

          {registrationState !== null && <p>{registrationState}</p>}

          <button
            type="submit"
            style={{marginTop: registrationState ? '5px' : '50px'}}
          >
            Register
          </button>

          <Link to="/login">Already an user?</Link>
        </form>
      </RegisterStyle>
    </>
  );
};

export default Register;
