import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';


const Login = () => {
  return (
    <>
      <form>
        <div className="container">
          <label htmlFor="uname"><b>Username</b></label>
          <input type="text" placeholder="Enter Username" name="uname" required/>

          <label htmlFor="psw"><b>Password</b></label>
          <input type="password" placeholder="Enter Password" name="psw" required/>

          <button type="submit">Login</button>
          <label></label>
          <input type="checkbox" name="remember"/>
          
        </div>

        <div className="container">
          <button type="button" className="cancelbtn">Cancel</button>
        </div>
      </form> 
    </>
    
  );
}

export default Login;
