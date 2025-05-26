// Navbar.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-white/20 border backdrop-blue-lg border-white/60 rounded-b-lg shadow-lg px-12 py-4 flex justify-between items-center">
      {/* Brand Logo */}
      <div className="text-[1.6rem] font-semibold text-blue-700 normal tracking-wide flex">
       <Link to="/" className="">RA Studio</Link>
      </div>

      {/* Navigation Links */}
      <div className="space-x-6 text-black-700 font-medium">
        <Link to="/" className="hover:text-blue-700 font-semibold transition tracking-wider">Home</Link>
        <Link to="/gallery" className="hover:text-blue-700 font-semibold transition tracking-wider">Gallery</Link>
        <Link to="/contact" className="hover:text-blue-700 font-semibold transition tracking-wider">Contact</Link>
      </div>
    </nav>
  );
};

export default Navbar;
