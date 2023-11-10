import React, { useState } from 'react';
import axios from 'axios'
import { useNavigate } from 'react-router-dom';

function RegisterPage() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
    });
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleRegistration = async (e) => {
        e.preventDefault();
        if (formData.password !== formData.confirmPassword) {
            alert("Passwords do not match");
            return;
        }

        try {
            const response = await axios.post('/api/users', {
                name: formData.name,
                email: formData.email,
                password: formData.password,
            });
            // assume the server logs the user in and returns a session
            if (response.data) {
                navigate('/') //redirect to homepage after successful registration
            }
        } catch (error) {
            console.error('Registration failed:', error.response?.data?.error || error.message);
            alert('Registration failed. Please try again')
        }
    }

    return (
        <div>
      <form onSubmit={handleRegistration}>
        <label>
          Name:
          <input type="text" name="name" value={formData.name} onChange={handleChange} />
        </label>
        <label>
          Email:
          <input type="email" name="email" value={formData.email} onChange={handleChange} />
        </label>
        <label>
          Password:
          <input type="password" name="password" value={formData.password} onChange={handleChange} />
        </label>
        <label>
          Confirm Password:
          <input type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} />
        </label>
        <button type="submit">Register</button>
      </form>
    </div>
    )
}

export default RegisterPage;