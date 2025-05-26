// Footer.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="relative bottom-0 w-full bg-gray-100 text-black-700 py-6 px-8">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center">
        {/* Brand or Copyright */}
        <div className="text-center md:text-left mb-4 md:mb-0 text-sm tracking-wide ">
          <span className="text-lg font-semibold normal tracking-wide text-blue-700">RA Studio</span> <br />
          <span className="text-sm">Made with 💙 by Richa Anand</span> <br />
          &copy; {new Date().getFullYear()} RA Studio. All rights reserved.
        </div>

        {/* Footer Links */}

        <div className='flex flex-col sm:flex-row flex-wrap md:gap-4 gap-2 justify-start items-start'>
          {/* Section Title */}
          <p className='text-sm md:pt-2 p-1 md:text-blue-700 tracking-wider text-center '>Links</p>

          {/* Navigation Group 1 */}
          <div className="grid gap-2 text-gray-800 text-sm md:text-left text-center md:border-l border-gray-800 md:pl-4 md:p-2 sm:border-0">
            <Link to="/" className="hover:text-blue-700 text-sm tracking-wider transition">Home</Link>
            <Link to="/gallery" className="hover:text-blue-700 text-sm tracking-wider transition">Gallery</Link>
          </div>

          {/* Navigation Group 2 */}
          <div className="grid gap-2 text-gray-800 text-sm md:text-left text-center md:p-2">
            <Link to="/login" className="hover:text-blue-700 text-sm tracking-wider transition">Admin</Link>
            <Link to="/credits" className="hover:text-blue-700 text-sm tracking-wider transition">Credits</Link>
          </div>
        </div>

      </div>
    </footer >
  );
};

export default Footer;
