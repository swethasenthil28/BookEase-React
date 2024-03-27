import React, { useState } from 'react';
import './styles/login.css'; // Import CSS file for styling
import { axiosInstance } from '../services/axios-http-client';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);
  const [message, setMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    let api = isAdmin ? "/owner/login" : "/client/login";
    await axiosInstance.post(api,{"email": email, "password": password}).then((res) =>{
        isAdmin ? localStorage.setItem("role","admin") : localStorage.setItem("role","user")
        navigate("/");
        setMessage("Logged in successfully");
    })
    .catch((err) => {
        setErrorMessage("Login error");
    })
    // http://localhost:8080/owner/login 
    console.log('Email:', email);
    console.log('Password:', password);
  };

  const handleRoleChange = () => {
    setIsAdmin(!isAdmin);
  }

  return (
    <>
    {
      message && <h3 className="alert alert-success">{message}</h3>
    }
    {
      errorMessage && <h3 className="alert alert-danger">{errorMessage}</h3>
    }
    <div className="login-container">
      <form onSubmit={handleSubmit} className="login-form">
        {!isAdmin ? <h2>User Login</h2> : <h2>Admin Login</h2>}
        <p>Please login to your account</p>
        <div className="input-group">
          <input type="email" id = "email" name = "email" value={email} placeholder="email" onChange={handleEmailChange} required />
        </div>
        <div className="input-group">
          <input type="password" id="password" name="password" placeholder="password" value={password} onChange={handlePasswordChange} required/>
        </div>
        <button type="submit">Login</button>
        <div class="bottom-text">
            {!isAdmin && <p>Don't have an account? <a href="#">Sign Up</a></p>}
            {!isAdmin && <p><a href="#">Forgot password?</a></p>}
            <p>{isAdmin ? <a onClick={handleRoleChange}>User Login?</a> : <a onClick={handleRoleChange}>Admin Login?</a>}</p>
        </div>
      </form>
    </div>
    </>
  );
};

export default Login;

