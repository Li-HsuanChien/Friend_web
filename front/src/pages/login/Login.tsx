import React from 'react';
import './index.css'


const Login = () => {
  return (
    <>
      <div className="background">
          <div className="shape"></div>
          <div className="shape"></div>
      </div>


      <form>
        <h3>Login</h3>

        <label htmlFor="username">Username</label>
        <input type="text" placeholder="Username" id="username"/>

        <label htmlFor="password">Password</label>
        <input type="password" placeholder="Password" id="password"/>

        <button>Log In</button>


        <a href='https://google.com'>Forgot password?</a>
      </form>
    </>
    
  );
}

export default Login;
