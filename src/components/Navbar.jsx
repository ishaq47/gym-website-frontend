import { Dumbbell, MenuIcon, X } from 'lucide-react';
import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';

function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="bg-[#03030380]">
      <div className="container mx-auto flex justify-between items-center py-1 px-6">
        {/* Logo */}
        <div className="flex items-center">
          <img src="/logo.png" alt="logo" className="w-[80px] h-[80px]" />
        </div>

        {/* Desktop Navigation */}
        <nav>
          <ul className="md:flex space-x-8 text-xl font-bold text-red-600 hidden fontt">
            <NavLink to="/" className="hover:text-blue-300">Home</NavLink>
            <NavLink to="/classes" className="hover:text-blue-300">Classes</NavLink>
            <NavLink to="/blog" className="hover:text-blue-300">Blog</NavLink>
            <NavLink to="/contact" className="hover:text-blue-300">Contact</NavLink>
            <NavLink to="/admin" className="hover:text-blue-300">Admin</NavLink>

          </ul>
          {/* Mobile Menu Icon */}
          <MenuIcon 
            className="md:hidden block text-red-600 text-[20px] cursor-pointer"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          />
        </nav>
      </div>

      {/* Mobile Sidebar Menu */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-20 bg-[#030303cc] text-white flex flex-col items-center space-y-6 py-8">
          <X 
            className="text-red-600 text-2xl absolute top-4 right-4 cursor-pointer"
            onClick={() => setIsMobileMenuOpen(false)}
          />
          <NavLink to="/" className="hover:text-blue-300 text-xl" onClick={() => setIsMobileMenuOpen(false)}>Home</NavLink>
          <NavLink to="/classes" className="hover:text-blue-300 text-xl" onClick={() => setIsMobileMenuOpen(false)}>Classes</NavLink>
          <NavLink to="/blog" className="hover:text-blue-300 text-xl" onClick={() => setIsMobileMenuOpen(false)}>Blog</NavLink>
          <NavLink to="/contact" className="hover:text-blue-300 text-xl" onClick={() => setIsMobileMenuOpen(false)}>Contact</NavLink>
          <NavLink to="/admin" className="hover:text-blue-300 text-xl">Admin</NavLink>
        </div>
      )}
    </header>
  );
}

export default Navbar;
