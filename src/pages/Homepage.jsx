import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
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

  return (
    <div className="home-container">
        <h1>Featured Items</h1>
      <div className="featured-products">
        {products.map(product => (
          <Product key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}

export default HomePage;
