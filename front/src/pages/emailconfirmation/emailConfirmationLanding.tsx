/* eslint-disable node/no-unpublished-import */
import React, { useEffect, useState } from 'react';
import { styled } from 'styled-components';
import { useToken } from '../../lib/hooks/useToken';
import { useParams } from 'react-router-dom';
import { useRefreshToken } from '../../lib/hooks/useRefreshToken';
import EmailConfirmSuccess from './emailConfirmSuccess';
import EmailConfirmFail from './emailConfirmFail';
import { VerifyEmailWithToken } from '../../lib/EmailVeridicationApi';

const ReportStyle = styled.div`

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

const EmailConfirmLanding = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isSuccess, setIsSuccess] = useState(false);
  const [token, setToken] = useToken();
  const [, setRefreshToken] = useRefreshToken();
  const {verificationToken} = useParams()

  useEffect(() => {
    VerifyEmailWithToken(token as string, verificationToken as string)
    .then((result) => {
      setRefreshToken(result.refresh);
      setToken(result.access);
      setIsSuccess(true);
      setIsLoading(false);
    })
    .catch(()=>{
      setIsSuccess(false);
      setIsLoading(false);
    })
  }, []);


  if (isLoading) return (
    <>
      <ReportStyle>
        <div className="background">
          <div className="shape"></div>
          <div className="shape"></div>
        </div>

        <main >
          <h3>Verifying your email</h3>
          <p>Thanks for signing up for friend-web!!</p>
          <p>Please wait a moment for us to verify you!!!</p>
        </main>
      </ReportStyle>
    </>
  );
  if (!isSuccess) return <EmailConfirmFail />
  return <EmailConfirmSuccess />
};

export default EmailConfirmLanding;
