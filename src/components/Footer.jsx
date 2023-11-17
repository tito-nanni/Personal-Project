import React from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Navigation from './Navigation';
import './Footer.css';

const Footer = ({ setIsAuthenticated }) => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axios.post('/api/logout');
      setIsAuthenticated(false);
      navigate('/login');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <footer className="footer">
      <Navigation setIsAuthenticated={setIsAuthenticated} />
      <button onClick={handleLogout}>Log Out</button>
      <p>&copy; {(new Date()).getFullYear()} Eagles Store</p>
    </footer>
  );
};

export default Footer;