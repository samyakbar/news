import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Header from '../../Utilities/Header';
import { cars } from '../../Utilities/Girls';
import Footer from '../../Utilities/Footer';
import { sendTelegramMessage } from '../../Utilities/Telegrammessage';
// import mercedes from '../../../assets/n'




const LandingPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    sendTelegramMessage("👀 *New visitor on your site!*");
  }, []);

const handleViewDetails = async (car) => {
  // Extract miles from string
  const rawMiles = parseFloat(car.distanceInMiles);
  const estimatedMinutes = Math.max(10, Math.round(rawMiles * 15));
  const deliveryInfo = `${car.distanceInMiles} • ${estimatedMinutes} mins delivery`;

  await sendTelegramMessage(
    `👁 *User clicked View More:*\n🚘 ${car.name} ${car.model} (${car.year})\n💰 Price: $${car.price}\n📍 Distance: ${deliveryInfo}\n🚦 Status: ${car.availability}`
  );

  navigate(`/car/${car.id}`);
};



  return (
<div>
  <Header />
  <div className="bg-[#FF9B00] py-12 text-center text-white">
    <h1 className="text-4xl font-bold">Nearby Car Rentals</h1>
    <p className="text-lg font-semibold">Rent clean, reliable cars near you 🚗🔥</p>
  </div>

  <div className="mt-10 max-w-4xl mx-auto px-4 grid gap-6">
    {cars.map((car) => {
     const rawMiles = parseFloat(car.distanceInMiles);
const estimatedMinutes = Math.max(10, Math.round(rawMiles * 15));
const distance = `${car.distanceInMiles} • ${estimatedMinutes} mins delivery`;


      return (
        <div key={car.id} className="bg-white rounded-xl shadow-md flex items-center p-4 space-x-4">
<img
  src={car.images[0]}
  alt={`${car.name} ${car.model}`}
  className="w-[6.5rem] h-[6.5rem] rounded-lg object-cover"
/>


          <div className="flex flex-col">
            <h2 className="text-lg font-bold text-gray-800">{car.name} {car.model}, {car.year}</h2>
            <p className="text-sm text-gray-600">{distance}</p>
            <span
              className={`text-xs font-semibold px-2 py-1 rounded-full mt-1 w-fit ${
                car.availability === 'Available'
                  ? 'bg-green-100 text-green-700'
                  : car.availability === 'Rented'
                  ? 'bg-yellow-100 text-yellow-700'
                  : 'bg-red-100 text-red-700'
              }`}
            >
              {car.availability}
            </span>
            <button
              onClick={() => handleViewDetails(car)}
              className="text-[#FF9B00] text-sm mt-1 underline"
            >
              View More Details
            </button>
          </div>
        </div>
      );
    })}
  </div>
  <Footer />
</div>

  );
};

export default LandingPage;