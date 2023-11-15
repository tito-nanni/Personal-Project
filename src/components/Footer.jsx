import React from 'react';

const Footer = () => {
  return (
    <footer className="footer">
      {/* Add footer content here, like copyright notice */}
      <p>&copy; {(new Date()).getFullYear()} Eagles Store</p>
    </footer>
  );
};

export default Footer;
