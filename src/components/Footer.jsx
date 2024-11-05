import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faWhatsapp, faTiktok } from '@fortawesome/free-brands-svg-icons';
import { NavLink } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-gray-300 py-8 border-t border-gray-700 w-full">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center md:items-start">
        
        {/* Logo Section */}
        <div className="flex items-center mb-4 md:mb-0 md:justify-start justify-between">
          <img src="/logo.png" alt="logo" className="w-[60px] h-[60px] mr-4" />
          <p className="text-lg font-semibold">&copy; 2024 SMG Gym</p>
        </div>
        
        {/* Navigation Links */}
        <div className="mb-4 md:mb-0 text-center md:text-left">
          <nav className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-6">
          <NavLink to="/" className="hover:text-blue-300">Home</NavLink>
            <NavLink to="/classes" className="hover:text-blue-300">Classes</NavLink>
            <NavLink to="/blog" className="hover:text-blue-300">Blog</NavLink>
            <NavLink to="/contact" className="hover:text-blue-300">Contact</NavLink>
           
          </nav>
        </div>

        {/* Social Icons */}
        <div className="flex space-x-4 text-center">
          <a href="#" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
            <FontAwesomeIcon icon={faFacebook} className="text-blue-400 hover:text-white transition duration-200" size="2xl" />
          </a>
          <a href="tel:+923158317836" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp">
            <FontAwesomeIcon icon={faWhatsapp} className="text-green-300 hover:text-white transition duration-200" size="2xl" />
          </a>
          <a href="#" target="_blank" rel="noopener noreferrer" aria-label="TikTok">
            <FontAwesomeIcon icon={faTiktok} className="text-gray-300 hover:text-white transition duration-200" size="2xl" />
          </a>
        </div>
      </div>
      
      {/* Footer Text */}
      <div className="mt-6 text-center text-sm">
        <p>All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
