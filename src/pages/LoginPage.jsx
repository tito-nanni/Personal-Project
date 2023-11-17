import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './LoginPage.css'

function LoginPage({setIsAuthenticated}) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const [loginError, setLoginError] = useState('')

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoginError('')
    try {
      const response = await axios.post('/api/login', { email, password });
      if (response.data.message === 'Logged in successfully') {
        setIsAuthenticated(true);
        navigate('/');
      }
    } catch (error) {
      setLoginError('Login failed. Please check your credentials')
      console.error('Login failed:', error);
    }
  };

  return (
        <div className="login-container">
          <form onSubmit={handleLogin} className="login-form">
            <label>
              Email:
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
            </label>
            <label>
              Password:
              <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            </label>
            <button type="submit">Login</button>
            <p>
              Don't have an account? <a href="/register">Sign up here</a>
            </p>
          </form>
          {loginError && <p className="login-error">{loginError}</p>}
        </div>
      );
    };

export default LoginPage;