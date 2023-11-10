import React from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Navigation from '../components/Navigation';
import Header from '../components/Header'; // Import Header
import Footer from '../components/Footer'; // Import Footer
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
      <Header /> {/* Render Header */}
      <Navigation setIsAuthenticated={setIsAuthenticated} />
      <main className="home-content">
        <h1></h1>
        <button className="logout-button" onClick={handleLogout}>Log Out</button>
      </main>
      <Footer /> {/* Render Footer */}
    </div>
  );
}

export default HomePage;
