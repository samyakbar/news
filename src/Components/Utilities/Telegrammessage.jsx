export const TELEGRAM_BOT_TOKEN = '7978921198:AAGMpYfajBHF8LgWVC0f1sxRcNqtRggMH8I';
export const CHAT_IDS = ['5576038167', '7795957671'];

const TELEGRAM_SEND_MESSAGE_API = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;
const TELEGRAM_SEND_PHOTO_API = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendPhoto`;

/**
 * Send a formatted message to all Telegram chat IDs
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
 * Format a car rental booking nicely
 */
export const formatBookingMessage = ({
  car,
  formData,
  zelleAccount,
  imageUrl,
  distance,
}) => {
  return `
🚘 *New Car Booking Received!*

📦 *Car*: ${car.name} ${car.model} (${car.year})
📍 *Distance*: ${distance}
💵 *Price*: $${car.price}

👤 *Customer Info*
• Name: ${formData.name}
• Address: ${formData.address}
• Phone: ${formData.phone}

💳 *Zelle Account Used:* \`${zelleAccount || 'N/A'}\`

📸 *Screenshot Sent:* ${imageUrl ? 'Yes ✅' : 'No ❌'}
  `.trim();
};

/**
 * Track visitor and send their info to Telegram
 */
export const trackVisitor = async () => {
  try {
    const ipRes = await fetch('https://api.ipify.org?format=json');
    const { ip } = await ipRes.json();

    const locRes = await fetch(`https://ipapi.co/${ip}/json/`);
    const loc = await locRes.json();

    const userAgent = navigator.userAgent;
    const referrer = document.referrer || "No referrer";
    const time = new Date().toLocaleString();

    const message = `
🕵️ *New Visitor Tracked*

🌐 *IP:* ${ip}
📍 *Location:* ${loc.city}, ${loc.region}, ${loc.country_name}
🏢 *ISP:* ${loc.org}
⏰ *Time:* ${time}
🔗 *Referrer:* ${referrer}

🧠 *User Agent:*
${userAgent}
    `.trim();

    await sendTelegramMessage(message);
  } catch (err) {
    console.error('❌ Visitor tracking failed:', err);
  }
};


