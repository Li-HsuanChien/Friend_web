/* eslint-disable node/no-unpublished-import */
import React, { useState, useEffect } from 'react';
import { styled } from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';
import {ChangeEvent} from 'react';
import { SendResetLink } from '../../lib/PasswordResetApi';

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
    right: -80px;
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
    margin: 20px;
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
    margin-top: 80px;
    font-size: 16px;
    font-weight: 500;
  }

  input {
    display: block;
    height: 50px;
    width: 95%;
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
    margin-top: 100px;
    width: 100%;
    background-color: #ffffff;
    color: #080710;
    padding: 15px 0;
    font-size: 18px;
    font-weight: 600;
    border-radius: 5px;
    cursor: pointer;
    bottom: 10px;
  }
  main {
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

  main * {
    font-family: 'Poppins', sans-serif;
    color: #ffffff;
    letter-spacing: 0.5px;
    outline: none;
    border: none;
  }

  main h3 {
    font-size: 32px;
    font-weight: 500;
    line-height: 42px;
    text-align: center;
  }

  main p {
    text-align: center;
    margin-top: 15px;
    margin-bottom: 10px;
    font-size: 13px;
  }
`
const LinkLeft = styled(Link)`
  display: block;
  text-align: left;
`

const PasswordResetSender = () => {
  const nav = useNavigate();
  const [email, setEmail] = useState<string>('');
  const [success, setSuccess] = useState<boolean>(false);
  const [message, setMessage] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>('');

  useEffect(() => {
    if(success){
      let countdown = 4; // Adjust the countdown duration as needed
      const timer = setInterval(() => {
        if (countdown === 0) {
          clearInterval(timer);
        } else {
          setMessage(`Sending verification email in ${countdown - 2} seconds...`);
          countdown--;
        }
      }, 1000);
      return () => clearInterval(timer); // Cleanup the timer on unmount
    }
  }, [success]);

  const handleSubmit = (e: any) =>{
    e.preventDefault();
    SendResetLink(email)
    .then(() => {
      setSuccess(true);
      setTimeout(() => {
        nav('/login');
    }, 3000);
    })
    .catch((error) => setErrorMessage(error.message));
  }

  return (
    <>
      <LoginStyle>

        <div className="background">
          <div className="shape"></div>
          <div className="shape"></div>
        </div>
        {success ? <main>
                      <h3>success!</h3>
                      <p>Check your email for reset link!</p>
                      <p>{message}</p>
                    </main>
        :<form onSubmit={handleSubmit}>
          <h3>Reset Password</h3>

          <label htmlFor="email">Email</label>
          <input
            required
            type="text"
            placeholder="Email"
            id="email"
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              setEmail(e.target.value);
            }}
          />
          <button
            type="submit"
          >Submit</button>
          {errorMessage && <p>{errorMessage}</p>}
          <LinkLeft to="/login">Back to Login</LinkLeft>
        </form>
      }
      </LoginStyle>
    </>
  );
};

export default PasswordResetSender;
