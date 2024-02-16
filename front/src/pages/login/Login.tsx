import React from 'react';
import './index.css'
import { styled } from 'styled-components'

const LoginStyle = styled.div`

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
    background: linear-gradient(#dfe1e4,
            #b7b7b8);
    left: -80px;
    top: -80px;
}

.shape:last-child {
    background: linear-gradient(to right,
            #dfe1e4,
            #b7b7b8);
    right: -30px;
    bottom: -80px;
}

form {
    height: 480px;
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

form a {
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

`

const Login = () => {
    return (
        <>
            <LoginStyle>
                <div className="background">
                    <div className="shape"></div>
                    <div className="shape"></div>
                </div>


                <form>
                    <h3>Login</h3>

                    <label htmlFor="username">Username</label>
                    <input type="text" placeholder="Username" id="username" />

                    <label htmlFor="password">Password</label>
                    <input type="password" placeholder="Password" id="password" />

                    <button>Log In</button>


                    <a href='https://google.com'>Forgot password?</a>
                </form>
            </LoginStyle>
        </>

    );
}

export default Login;
