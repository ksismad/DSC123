import React from 'react';
import { MapPin, Mail, Phone, Globe } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12 px-4">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-4">
          <h3 className="text-xl font-bold">Contact Information</h3>
          <div className="space-y-3">
            <div className="flex items-center space-x-3">
              <MapPin className="text-blue-400" />
              <p>OFA BUSINESS SOLUTIONS (Head Office), Betiahata, Gorakhpur, U.P - 273001</p>
            </div>
            <div className="flex items-center space-x-3">
              <Mail className="text-blue-400" />
              <a href="mailto:ofabsin@gmail.com" className="hover:text-blue-400">ofabsin@gmail.com</a>
            </div>
            <div className="flex items-center space-x-3">
              <Phone className="text-blue-400" />
              <a href="tel:+917388288022" className="hover:text-blue-400">+91-7388288022 (Call/WhatsApp)</a>
            </div>
            <div className="flex items-center space-x-3 bg-blue-800 p-3 rounded-lg hover:bg-blue-700 transition-colors">
              <Globe className="text-blue-400" />
              <a 
                href="https://g.page/r/Cd1IFJTvW_XIEB0/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:text-blue-400"
              >
                View Our Customer Reviews & Ratings
              </a>
            </div>
          </div>
        </div>
        
        <div className="space-y-4">
          <h3 className="text-xl font-bold">Service Information</h3>
          <ul className="space-y-2 text-gray-300">
            <li>• Pan India delivery with no extra charges</li>
            <li>• Express processing available for urgent requirements</li>
            <li>• Remote assistance for all states</li>
            <li>• Non-refundable payment policy</li>
            <li>• Available for all business types across India</li>
          </ul>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto mt-8 pt-8 border-t border-gray-800 text-center text-gray-400">
        <p>© {new Date().getFullYear()} OFA BUSINESS SOLUTIONS DIGITAL HUB. All rights reserved.</p>
      </div>
    </footer>
  );
}