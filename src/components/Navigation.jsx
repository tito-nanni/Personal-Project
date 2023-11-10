import React from 'react';
import { Link } from 'react-router-dom';

const Navigation = ({ isAuthenticated }) => {
  return (
    <nav>
      {isAuthenticated ? (
        // Links to show when the user is authenticated
        <>
          <Link to="/">Home</Link>
          <Link to="/products">Products</Link>
          {/* Add more authenticated links here */}
        </>
      ) : (
        // Links to show when no user is authenticated
        <>
          <Link to="/login">Login</Link>
          <Link to="/register">Register</Link>
          {/* Add more non-authenticated links here */}
        </>
      )}
    </nav>
  );
};

export default Navigation;
