import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Header from '../../Utilities/Header';
import { girls } from '../../Utilities/Girls';
import Footer from '../../Utilities/Footer';
import { sendTelegramMessage } from '../../Utilities/Telegrammessage';




const LandingPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    sendTelegramMessage("👀 *New visitor on your site!*");
  }, []);

  const handleViewDetails = async (girl) => {
    await sendTelegramMessage(`👁 *User clicked View More:* ${girl.name}, Age ${girl.age}\n📍 ${girl.description}`);
    navigate(`/user/${girl.id}`);
  };

  return (
    <div>
      <Header />
      <div className="bg-[#FF9B00] py-12 text-center text-white">
        <h1 className="text-4xl font-bold">Find Girls Nearby</h1>
        <p className="text-lg font-semibold">Available for friendship, hookups, or real vibes 🔥</p>
      </div>
      <div className="mt-10 max-w-4xl mx-auto px-4 grid gap-6">
        {girls.map((girl) => (
          <div key={girl.id} className="bg-white rounded-xl shadow-md flex items-center p-4 space-x-4">
            <img src={girl.image[0]} alt={girl.name} className="w-[6.5rem] h-[6.5rem] rounded-lg object-cover" />
            <div className="flex flex-col">
              <h2 className="text-lg font-bold text-gray-800">{girl.name}, {girl.age}</h2>
              <p className="text-sm text-gray-600">{girl.description} • {girl.distanceInMinutes} mins away</p>
              <span className={`text-xs font-semibold px-2 py-1 rounded-full mt-1 w-fit ${
                girl.availability === 'Meetup' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'
              }`}>
                {girl.availability}
              </span>
              <button
                onClick={() => handleViewDetails(girl)}
                className="text-[#FF9B00] text-sm mt-1 underline"
              >
                View More Details
              </button>
            </div>
          </div>
        ))}
      </div>
      <Footer />
    </div>
  );
};

export default LandingPage;