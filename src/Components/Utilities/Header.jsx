import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="bg-[#03264d] text-white sticky top-0 z-50 shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-2 flex justify-between items-center">
        {/* Left: Logo */}
        <Link to="/" className="flex items-center space-x-2">
          <span className="font-bold text-white text-lg">FOX NEWS</span>
        </Link>

        {/* Right: Watch TV */}
        <button className="bg-red-600 text-white px-3 py-1 text-xs rounded-md font-semibold">
          Watch TV
        </button>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white text-sm flex items-center overflow-x-auto space-x-2 px-2 py-2 border-t border-b border-gray-200">
        <Link to="/" className="px-3 py-1 rounded-full bg-gray-100 text-gray-800 font-medium hover:bg-gray-200">
          Home
        </Link>
        <Link to="/israel-iran-conflict" className="px-3 py-1 rounded-full bg-gray-100 text-gray-800 font-medium hover:bg-gray-200 whitespace-nowrap">
          ISRAEL-IRAN CONFLICT
        </Link>
        <Link to="/trump-news" className="px-3 py-1 rounded-full bg-red-600 text-white font-medium hover:bg-red-700 whitespace-nowrap">
          TRUMP NEWS
        </Link>
        {/* You can add more tabs here */}
      </div>
    </header>
  );
};

export default Header;
