import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import PropTypes from 'prop-types';
import { loginUser } from '../../api';

import './index.css'

import logo from '../../images/brand-logo.png';


export default function LoginPage({ setToken }) {
    const [username, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [rightPanelActive, setRightPanelActive] = useState(false);
    const [error, setError] = useState(''); // For error message
    const navigate = useNavigate();
    const handleSubmit = async e => {
        e.preventDefault();

      if ((!username || !username.trim()) && (!password || !password.trim())) {
        alert('Please enter your username and password.');
        return;
      }
      if (!username || !username.trim()) {
        alert('Please enter your username.');
        return;
      }
      if (!password || !password.trim()) {
        alert('Please enter your password.');
        return;
      }

      setError(''); // Clear any previous errors

      try {
        
        const tokenData = await loginUser({ username, password });

        // Save token and username in localStorage
        localStorage.setItem('token', tokenData.token);
        localStorage.setItem('username', tokenData.user.username);

        setToken(tokenData.token);

        // Navigate to dashboard
        navigate(`/dashboard/${tokenData.user.username}`);
      } catch (err) {
        alert('Login failed. Please check your credentials.');
        console.error('Login error:', err);
        setError('Login failed. Please check your credentials.');
      }
    } 

  return (
    <div className="signInUpRoot-LoginPage">
      <div className="signInPageWrapper-LoginPage">

        <div className="container-LoginPage signInContainer-LoginPage standaloneSignIn-LoginPage">
          <form className='form-LoginPage'>
            <h1 className="heading-LoginPage">Sign in</h1>
            {/* <div className="socialContainer-LoginPage">
              <a href="#" className="social-LoginPage">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="#" className="social-LoginPage">
                <i className="fab fa-google-plus-g"></i>
              </a>
              <a href="#" className="social-LoginPage">
                <i className="fab fa-linkedin-in"></i>
              </a>
            </div> */}
            <span className="span-LoginPage">or use your account</span>
            <input type="email" placeholder="Username" className="input-LoginPage" onChange={e => setUserName(e.target.value)}/>
            <input type="password" placeholder="Password" className="input-LoginPage" onChange={e => setPassword(e.target.value)}/>
            <a href="#" className="link-LoginPage">
              Forgot your password?
            </a>
            <button className="button-LoginPage" onClick={handleSubmit}>Sign In</button>
          </form>
        </div>

      </div>
    </div>
  );
}


LoginPage.propTypes = {
  setToken: PropTypes.func.isRequired
}