import { MapPin, Mail, Phone } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-10 px-4">
      <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-10">
        {/* About */}
        <div>
          <h3 className="text-xl font-bold mb-3">About Ave Ride Car</h3>
          <p className="text-sm text-gray-300">
            Ave Ride Car is your trusted platform for reliable car rentals in Kansas. Affordable, clean, and always nearby. 🚗💨
          </p>
          <div className="flex items-center mt-3 space-x-2 text-gray-400 text-sm">
            <MapPin className="w-4 h-4" />
            {/* <span>Overland Park, Kansas</span> */}
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-xl font-bold mb-3">Quick Links</h3>
          <ul className="space-y-2 text-sm text-gray-300">
            <li><Link to="/" className="hover:text-[#FF9B00]">Home</Link></li>
            <li><Link to="/cars" className="hover:text-[#FF9B00]">Available Cars</Link></li>
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
            <span>support@averidecar.com</span>
          </div>
          <div className="flex items-center space-x-2 text-gray-300 text-sm mb-2">
            <Phone className="w-4 h-4" />
            {/* <span>+1 (913) 555-8765</span> */}
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div className="border-t border-gray-700 mt-10 pt-6 text-center text-sm text-gray-500">
        &copy; {new Date().getFullYear()} Ave Ride Car. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;

