import React from 'react';
import { Link } from 'react-router-dom';
import { Wheat, Github } from 'lucide-react';
import { motion } from 'framer-motion';

function Navbar() {
  return (
    <motion.nav 
      className="bg-white shadow-md"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2">
            <Wheat className="h-8 w-8 text-green-600" />
            <span className="text-xl font-bold text-green-800">TechnoKaze</span>
          </Link>
          <a 
            href="https://github.com/tanuj_8124" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center space-x-2 text-gray-600 hover:text-green-600 transition-colors"
          >
            <Github className="h-6 w-6" />
            <span>GitHub</span>
          </a>
        </div>
      </div>
    </motion.nav>
  );
}

export default Navbar;