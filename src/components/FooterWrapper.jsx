import React from 'react';
import { useLocation } from 'react-router-dom';
import Footer from './Footer';

const FooterWrapper = ({ isAuthenticated, setIsAuthenticated }) => {
  const location = useLocation();
  const hideFooterRoutes = ['/login', '/register'];

  // Check if the current path is one of the routes where the Footer should be hidden
  const shouldHideFooter = hideFooterRoutes.includes(location.pathname);

  // Only render the Footer if we're not on a route that should hide it and if authenticated
  if (!shouldHideFooter && isAuthenticated) {
    return <Footer setIsAuthenticated={setIsAuthenticated} />;
  }

  return null; // Render nothing if it's a route that should hide the Footer
};

export default FooterWrapper;

