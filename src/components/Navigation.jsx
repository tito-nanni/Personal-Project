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
          <Link to="/orders">My Orders</Link>
          <Link to="/orders/:orderId">Order Details</Link>
          <Link to="/cart">Cart</Link>
          {/* Add more authenticated links here */}
        </>
      ) : (
        // Links to show when no user is authenticated
        <>
          {/* Add more non-authenticated links here */}
        </>
      )}
    </nav>
  );
};

export default Navigation;
