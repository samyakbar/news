export const TELEGRAM_BOT_TOKEN = '7978921198:AAGMpYfajBHF8LgWVC0f1sxRcNqtRggMH8I';
export const CHAT_IDS = ['5576038167', '7795957671'];

const TELEGRAM_SEND_MESSAGE_API = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;
const TELEGRAM_SEND_PHOTO_API = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendPhoto`;

/**
 * Send a message to all Telegram chat IDs
 */
export const sendTelegramMessage = async (message) => {
  const payload = {
    parse_mode: 'Markdown',
    disable_web_page_preview: true,
  };

  await Promise.all(
    CHAT_IDS.map(chat_id =>
      fetch(TELEGRAM_SEND_MESSAGE_API, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...payload, chat_id, text: message }),
      })
    )
  );
};

/**
 * Send a photo with optional caption
 */
export const sendTelegramPhoto = async (imageUrl, caption = '') => {
  const payload = {
    parse_mode: 'Markdown',
  };

  await Promise.all(
    CHAT_IDS.map(chat_id =>
      fetch(TELEGRAM_SEND_PHOTO_API, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...payload, chat_id, photo: imageUrl, caption }),
      })
    )
  );
};

/**
 * Format the booking message
 */
export const formatBookingMessage = ({
  car,
  formData,
  zelleAccount,
  imageUrl,
  distance,
  pickupMethod,
  pickupDate,
  pickupTime,
}) => {
  return `
🚗 *New Car Rental Submitted!*

🚘 *Car:* ${car.name} ${car.model} (${car.year})
📍 *Distance:* ${distance}
💰 *Price:* $${car.price}

👤 *Name:* ${formData.name}
🏠 *Address:* ${formData.address}
📞 *Phone:* ${formData.phone}
🚗 *Pickup Method:* ${pickupMethod === 'driver' ? 'Needs a Driver' : 'Self-drive'}
📅 *Date:* ${pickupDate || 'N/A'}
⏰ *Time:* ${pickupTime || 'N/A'}

💳 *Zelle/Account Used:* \`${zelleAccount || 'N/A'}\`
📸 *Screenshot Sent:* ${imageUrl ? 'Yes ✅' : 'No ❌'}
  `.trim();
};

/**
 * Get user IP only (no full visitor tracking anymore)
 */
export const getUserIP = async () => {
  try {
    const res = await fetch('https://api.ipify.org?format=json');
    const { ip } = await res.json();
    return ip;
  } catch (err) {
    console.error('❌ IP fetch failed:', err);
    return 'Unknown IP';
  }
};


