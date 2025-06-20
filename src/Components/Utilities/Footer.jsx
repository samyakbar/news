import { MapPin, Instagram, Mail, Phone } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-10 px-4">
      <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-10">
        {/* About */}
        <div>
          <h3 className="text-xl font-bold mb-3">About Us</h3>
          <p className="text-sm text-gray-300">
            Connecting real people in Kansas for vibes, linkups, or content no catfish, just clean fun 💫.
          </p>
          <div className="flex items-center mt-3 space-x-2 text-gray-400 text-sm">
            <MapPin className="w-4 h-4" />
            <span>Overland Park, Kansas</span>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-xl font-bold mb-3">Explore</h3>
          <ul className="space-y-2 text-sm text-gray-300">
            <li><Link to="/" className="hover:text-[#FF9B00]">Home</Link></li>
            <li><Link to="/privacy" className="hover:text-[#FF9B00]">Privacy Policy</Link></li>
            <li><Link to="/terms" className="hover:text-[#FF9B00]">Terms of Service</Link></li>
            <li><Link to="/support" className="hover:text-[#FF9B00]">Support</Link></li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="text-xl font-bold mb-3">Contact</h3>
          <div className="flex items-center space-x-2 text-gray-300 text-sm mb-2">
            <Mail className="w-4 h-4" />
            <span>support@findher.com</span>
          </div>
          <div className="flex items-center space-x-2 text-gray-300 text-sm mb-2">
            <Phone className="w-4 h-4" />
            <span>+1 (913) 555-2222</span>
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div className="border-t border-gray-700 mt-10 pt-6 text-center text-sm text-gray-500">
        &copy; {new Date().getFullYear()} VibeKansas. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
