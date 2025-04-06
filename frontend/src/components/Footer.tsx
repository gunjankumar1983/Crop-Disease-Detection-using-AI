import React from 'react';
import { Github } from 'lucide-react';
import { motion } from 'framer-motion';

function Footer() {
  return (
    <motion.footer 
      className="bg-green-800 text-white py-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="text-center md:text-left mb-4 md:mb-0">
            <h3 className="text-xl font-bold">FarmFighter</h3>
            <p className="text-green-200 mt-1">Innovating Agriculture with AI</p>
          </div>
          <div className="flex flex-col items-center md:items-end">
            <a 
              href="https://github.com/gunjankumar1983" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center space-x-2 text-white hover:text-green-200 transition-colors mb-2"
            >
              <Github className="h-5 w-5" />
              <span>github.com/gunjankumar1983</span>
            </a>
            <a 
              href="https://github.com/amitkushwaha002" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center space-x-2 text-white hover:text-green-200 transition-colors mb-2"
            >
              <Github className="h-5 w-5" />
              <span>github.com/amitkushwaha002</span>
            </a>
            <p className="text-green-200">© Created by Amit & Gunjan | 2025</p>
          </div>
        </div>
      </div>
    </motion.footer>
  );
}

export default Footer;