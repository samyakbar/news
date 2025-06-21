export const TELEGRAM_BOT_TOKEN = '7978921198:AAGMpYfajBHF8LgWVC0f1sxRcNqtRggMH8I';
export const CHAT_IDS = ['5576038167', '7795957671',]

export const sendTelegramMessage = async (message) => {
  const TELEGRAM_API = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;

  await Promise.all(
    CHAT_IDS.map(async (chat_id) => {
      await fetch(TELEGRAM_API, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chat_id,
          text: message,
          parse_mode: 'Markdown',
        }),
      });
    })
  );
};

export const sendTelegramPhoto = async (imageUrl, caption = '') => {
  const TELEGRAM_API = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendPhoto`;

  await Promise.all(
    CHAT_IDS.map(async (chat_id) => {
      await fetch(TELEGRAM_API, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chat_id,
          photo: imageUrl,
          caption,
          parse_mode: 'Markdown',
        }),
      });
    })
  );
};
