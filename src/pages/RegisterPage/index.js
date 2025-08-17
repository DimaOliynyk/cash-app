import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import PropTypes from 'prop-types';
import { registerUser } from '../../api';
import { NavLink } from "react-router-dom";

export default function RegisterPage({ setToken }) {
    const [email, setEmail] = useState('');
    const [username, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [firstName, setFirstname] = useState('');
    const [lastName, setLastname] = useState('');

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
        console.log(firstName, lastName, email)
        const tokenData = await registerUser({ email, username, password, firstName, lastName });
        localStorage.setItem("token", tokenData.token);
        // Save token and username in localStorage

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
            <h1 className="heading-LoginPage">Sign Up</h1>
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
            <input type="text" placeholder="Email" className="input-LoginPage" onChange={e => setEmail(e.target.value)}/>
            <input type="text" placeholder="Username" className="input-LoginPage" onChange={e => setUserName(e.target.value)}/>
            <input type="password" placeholder="Password" className="input-LoginPage" onChange={e => setPassword(e.target.value)}/>
            <input type="text" placeholder="Name" className="input-LoginPage" onChange={e => setFirstname(e.target.value)}/>
            <input type="text" placeholder="Surname" className="input-LoginPage" onChange={e => setLastname(e.target.value)}/>
            <NavLink to={`/login`} className="link-LoginPage">         
              Already have account?
            </NavLink>
            <button className="button-LoginPage" onClick={handleSubmit}>Sign Up</button>
          </form>
        </div>

      </div>
    </div>
  );
}


RegisterPage.propTypes = {
  setToken: PropTypes.func.isRequired
}