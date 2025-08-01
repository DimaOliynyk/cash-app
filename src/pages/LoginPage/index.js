import React, { useState } from 'react';
import PropTypes from 'prop-types';

import './index.css'
import logo from '../../images/brand-logo.png';

async function loginUser(credentials) {
 return fetch('http://192.168.0.90:3000/api/auth/login', {
   method: 'POST',
   headers: {
     'Content-Type': 'application/json',
     'ngrok-skip-browser-warning': 'true'
   },
   body: JSON.stringify(credentials)
 })
   .then(data => data.json())
}

export default function LoginPage({ setToken }) {
    const [username, setUserName] = useState();
    const [password, setPassword] = useState();
    const [error, setError] = useState(''); // For error message

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
        const token = await loginUser({
          username,
          password,
        });
        setToken(token);
        localStorage.setItem('token', token.token);
        localStorage.setItem('username', token.user.username);

    } catch (err) {
        // Handle loginUser errors (e.g. wrong credentials)
        alert('Login failed. Please check your credentials.');
        console.error(err);
      }
    } 

  return(
    <main className='LoginPage-main'>
        <img src={logo} className='GetStartedPage-logo' />

        <div className='LoginPage-inputs'>
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder='username' onChange={e => setUserName(e.target.value)}/>
                <input type="text" placeholder='password' onChange={e => setPassword(e.target.value)}/>

                <button onClick={handleSubmit} className='LoginPage-login' type="submit">Login</button>
            </form>
        </div>
    </main>
  )
}

LoginPage.propTypes = {
  setToken: PropTypes.func.isRequired
}