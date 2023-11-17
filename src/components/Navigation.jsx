import React from 'react';
import { Link } from 'react-router-dom';
import './Navigation.css';

const Navigation = ({ isAuthenticated }) => {
  return (
    <nav>
      {isAuthenticated ? (
        // Links to show when the user is authenticated
        <>
          <Link to="/">Home</Link>
          <Link to="/products">Products</Link>
          <Link to="/cart">Cart</Link>
          <Link to="/reviews">Reviews</Link>
          <Link to="/orders">My Orders</Link>
          <Link to="/contact">Contact Us</Link>
        </>
      ) : (
        // Links to show when no user is authenticated
        <>
          {/* Add non-authenticated links here */}
        </>
      )}
    </nav>
  );
};

export default Navigation;
