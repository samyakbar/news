// import { MapPin, Mail, Phone } from 'lucide-react';
// import { Link } from 'react-router-dom';

// const Footer = () => {
//   return (
//     <footer className="bg-gray-900 text-white py-10 px-4">
//       <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-10">
//         {/* About */}
//         <div>
//           <h3 className="text-xl font-bold mb-3">About Ave Ride Car</h3>
//           <p className="text-sm text-gray-300">
//             Ave Ride Car is your trusted platform for reliable car rentals in wv Charleston to princenton. Affordable, clean, and always nearby. 🚗💨
//           </p>
//           <div className="flex items-center mt-3 space-x-2 text-gray-400 text-sm">
//             <MapPin className="w-4 h-4" />
//             <span>WV Charleston to princenton</span>
//           </div>
//         </div>

//         {/* Quick Links */}
//         <div>
//           <h3 className="text-xl font-bold mb-3">Quick Links</h3>
//           <ul className="space-y-2 text-sm text-gray-300">
//             <li><Link to="/" className="hover:text-[#FF9B00]">Home</Link></li>
//             <li><Link to="/cars" className="hover:text-[#FF9B00]">Available Cars</Link></li>
//             <li><Link to="/privacy" className="hover:text-[#FF9B00]">Privacy Policy</Link></li>
//             <li><Link to="/terms" className="hover:text-[#FF9B00]">Terms of Service</Link></li>
//             <li><Link to="/support" className="hover:text-[#FF9B00]">Support</Link></li>
//           </ul>
//         </div>

//         {/* Contact */}
//         <div>
//           <h3 className="text-xl font-bold mb-3">Contact</h3>
//           <div className="flex items-center space-x-2 text-gray-300 text-sm mb-2">
//             <Mail className="w-4 h-4" />
//             <span>support@averidecar.com</span>
//           </div>
//           <div className="flex items-center space-x-2 text-gray-300 text-sm mb-2">
//             <Phone className="w-4 h-4" />
//             {/* <span>+1 (913) 555-8765</span> */}
//           </div>
//         </div>
//       </div>

//       {/* Bottom */}
//       <div className="border-t border-gray-700 mt-10 pt-6 text-center text-sm text-gray-500">
//         &copy; {new Date().getFullYear()} Ave Ride Car. All rights reserved.
//       </div>
//     </footer>
//   );
// };

// export default Footer;

import { MapPin, Mail, Phone, Twitter, Facebook, Youtube } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-[#111] text-white px-4 pt-10 pb-6">
      <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-10">

        {/* Branding */}
        <div>
          <h3 className="text-2xl font-extrabold text-red-600 mb-2">TERRABYTE NEWS</h3>
          <p className="text-sm text-gray-400 leading-relaxed">
            Trusted source for up-to-the-minute alerts, breaking stories, and fearless reporting. We tell it as it is — raw and real.
          </p>
        </div>

        {/* Navigation */}
        <div>
          <h4 className="text-lg font-semibold mb-3 text-white">Sections</h4>
          <ul className="space-y-2 text-sm text-gray-300">
            <li><Link to="/" className="hover:text-red-500">Home</Link></li>
            <li><Link to="/trending" className="hover:text-red-500">Trending</Link></li>
            <li><Link to="/conflict" className="hover:text-red-500">Conflicts</Link></li>
            <li><Link to="/tech" className="hover:text-red-500">Tech</Link></li>
            <li><Link to="/sports" className="hover:text-red-500">Sports</Link></li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4 className="text-lg font-semibold mb-3 text-white">Contact Us</h4>
          <div className="flex items-start space-x-2 text-sm text-gray-300 mb-2">
            <Mail className="w-4 h-4 mt-1" />
            <span>tips@terrabytetv.com</span>
          </div>
          {/* <div className="flex items-start space-x-2 text-sm text-gray-300 mb-2">
            <Phone className="w-4 h-4 mt-1" />
            <span>+1 (555) 000-9821</span>
          </div> */}
          <div className="flex items-start space-x-2 text-sm text-gray-300">
            <MapPin className="w-4 h-4 mt-1" />
            <span>Studio HQ, Downtown DC, USA</span>
          </div>
        </div>

        {/* Social Links */}
        <div>
          <h4 className="text-lg font-semibold mb-3 text-white">Follow Us</h4>
          <div className="flex space-x-4 text-gray-300">
            <a href="#" className="hover:text-blue-400"><Facebook size={20} /></a>
            <a href="#" className="hover:text-sky-400"><Twitter size={20} /></a>
            <a href="#" className="hover:text-red-500"><Youtube size={20} /></a>
          </div>
        </div>
      </div>

      {/* Bottom note */}
      <div className="border-t border-gray-700 mt-10 pt-4 text-center text-xs text-gray-500">
        &copy; {new Date().getFullYear()} Terrabyte News. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;



