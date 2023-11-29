import React from 'react';
import { useLocation } from 'react-router-dom';
import Header from './Header';

const HeaderWrapper = () => {
  const location = useLocation();

  if (location.pathname === '/login' || location.pathname === '/register') {
    return null; // Don't render the Header on the login page
  }

  return <Header />; // Render the Header on all other pages
};

export default HeaderWrapper;
