import React, { useState, useEffect} from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'

function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loginError, setLoginError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        // If user is already logged in, redirect to homepage
        if (sessionStorage.getItem('isLoggedIn')) {
            navigate('/');
        }
    }, [navigate]);

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('/api/login', { email, password });
            if (response.data.message === 'Logged in successfully') {
                // Save the logged-in state to sessionStorage or context/state management
                sessionStorage.setItem('isLoggedIn', true);
                navigate('/');
            }
        } catch (error) {
            if (error.response) {
                setLoginError(error.response.data.message);
            } else {
                setLoginError('Failed to login')
            }
        }
    };

    return (
        <div>
            <form onSubmit={handleLogin}>
                <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                required
                />
                <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                required
                />
                <button type="submit">Login</button>
                {loginError && <p>{loginError}</p>}
            </form>
        </div>
    )
}

export default LoginPage;