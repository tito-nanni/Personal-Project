import React from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Navigation from '../components/Navigation';
import Header from '../components/Header';
import Footer from '../components/Footer';
import './Homepage.css';

function HomePage({ setIsAuthenticated }) {
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
    <div className="home-container">
      <Header /> {/* Render the header */}
      <Navigation setIsAuthenticated={setIsAuthenticated} />
      <main className="home-content">
        <h1></h1>
        <button className="logout-button" onClick={handleLogout}>Log Out</button>
      </main>
      <Footer /> {/* Render the footer */}
    </div>
  );
}

export default HomePage;
