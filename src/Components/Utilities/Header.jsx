import { Link } from "react-router-dom";

// import Button from "./Utilities/Button";


const Header = () => {
  return (
    <header className="bg-white border-b border-gray-200 shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-[#FF9B00] to-[#FF9933] rounded-lg flex items-center justify-center">
              {/* <span className="text-white font-bold text-lg">V</span> */}
            </div>
            <span className="text-xl font-bold text-gray-900">Ave Ride Car</span>
          </Link>

          {/* Right side button
          <div className="flex items-center">
            <Button variant="success">
                Create Profile
            </Button>
          </div> */}
        </div>
      </div>
    </header>
  );
};

export default Header;