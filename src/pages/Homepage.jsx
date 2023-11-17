import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import Product from './Product';
import './Homepage.css';

function HomePage({ setIsAuthenticated }) {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('/api/products');
        setProducts(response.data.slice(0, 3))// setting first 3 products for display
      } catch (error) {
        console.error('error fetching products', error);
      }
    };
    
    fetchProducts();
  }, []);

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
      <Navigation setIsAuthenticated={setIsAuthenticated} />
      <main className="home-content">
      </main>
        <button className="logout-button" onClick={handleLogout}>Log Out</button>
        <h1>Featured Items</h1>
      <div className="featured-products">
        {products.map(product => (
          <Product key={product.id} product={product} />
        ))}
      </div>
      <Footer /> {/* Rendering the footer */}
    </div>
  );
}

export default HomePage;
