import React from 'react';

const Loader = () => (
  <div className="flex items-center justify-center space-x-2">
    <div className="w-4 h-4 bg-[#FF9B00] rounded-full animate-bounce"></div>
    <div className="w-4 h-4 bg-[#FF9B00] rounded-full animate-bounce delay-200"></div>
    <div className="w-4 h-4 bg-[#FF9B00] rounded-full animate-bounce delay-400"></div>
  </div>
);

export default Loader;