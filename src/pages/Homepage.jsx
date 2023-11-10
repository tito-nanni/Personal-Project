import React from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Homepage.css';

function HomePage({setIsAuthenticated}) {
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await axios.post('/api/logout');
            setIsAuthenticated(false)
            navigate('/login');
        } catch (error) {
            console.error('Logout failed:', error);
        }
    };


    return (
        <div>
            <h1>Welcome to the Eagles Store</h1>
            <button className="logout-button" onClick={handleLogout}>Log Out</button>
        </div>
    );
}

export default HomePage;
