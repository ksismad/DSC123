import React from 'react';
import { FileDigit } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Header() {
  return (
    <header className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-6 px-4 shadow-lg">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between">
        <div className="flex items-center space-x-3">
          <FileDigit size={40} className="text-blue-200" />
          <div>
            <h1 className="text-2xl font-bold">OFA BUSINESS SOLUTIONS</h1>
            <p className="text-blue-200">India's Trusted DSC Provider</p>
          </div>
        </div>
        <nav className="mt-4 md:mt-0">
          <ul className="flex space-x-6 items-center">
            <li>
              <Link to="/" className="text-white hover:text-blue-200 transition-colors">
                Home
              </Link>
            </li>
            <li>
              <Link to="/about" className="text-white hover:text-blue-200 transition-colors">
                About Us
              </Link>
            </li>
            <li>
              <Link to="/blog" className="text-white hover:text-blue-200 transition-colors">
                Blog
              </Link>
            </li>
            <li>
              <p className="text-sm text-blue-200">Call/WhatsApp: +91-7388288022</p>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}