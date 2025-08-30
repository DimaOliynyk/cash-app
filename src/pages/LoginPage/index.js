import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import PropTypes from 'prop-types';
import { loginUser } from '../../api';

import { NavLink  } from "react-router-dom";

import LoadingPage from '../LoadingPage';

import './index.css'

export default function LoginPage({ setToken }) {
    const [username, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);


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
      setLoading(true); // show loading page

      try {
        const tokenData = await loginUser({ username, password });
        // Save token and username in localStorage
        if(!tokenData.token){
          alert('Wrong credentials!')
        } else{
          setToken(tokenData.token);
          localStorage.setItem("token", tokenData.token);
          // Navigate to dashboard
          navigate(`/dashboard/${tokenData.user.username}`);
        }
      } catch (err) {
        alert('Login failed. Please check your credentials.');
        console.error('Login error:', err);
        setError('Login failed. Please check your credentials.');
      } finally {
      setLoading(false); // 🔹 Hide loader after response
      }
    } 

  if (loading) {

    return <LoadingPage />;
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
            <NavLink to={`/register`} className="link-LoginPage">         
              Don't have account?
            </NavLink>
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