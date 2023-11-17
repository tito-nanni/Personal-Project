import React from 'react';

const Footer = () => {
  return (
    <footer className="footer">
      <p>&copy; {(new Date()).getFullYear()} Eagles Store</p>
    </footer>
  );
};

export default Footer;
