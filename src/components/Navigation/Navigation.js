// src/components/Navigation/Navigation.js
import React from 'react';
import { Link } from 'react-router-dom';

const Navigation = () => {
  return (
    <nav className="flex gap-4">
      <Link to="/" className="text-white hover:text-gray-300"></Link>
      {/* Add more navigation links here */}
    </nav>
  );
};

export default Navigation;
