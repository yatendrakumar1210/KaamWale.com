// Hindi WhatsApp message helper — LabourChowk (KaamWale)
// Format updated location-based & service-specific booking messages

export const buildWhatsAppMessage = (options = {}) => {
  if (typeof options === 'string') {
    options = { serviceName: options };
  }

  const {
    bookingType = 'NORMAL',
    serviceName = 'General Construction Labour',
    serviceType = 'daily', // 'loading_unloading' | 'hourly' | 'daily'
    serviceRate,
    workerCount = 1,
    numberOfBags = 0,
    carryingDistance = '20m',
    weightPerBag = 'लगभग 40–50 kg',
    durationHours = 4,
    labourAmount = 600,
    transportationCharge = 50,
    tatkalCharge = 0,
    totalAmount,
    estimatedTotal,
    workLocation = null,
    date = 'Aaj',
    startTime = '09:00 AM',
    workNotes = ''
  } = options;

  const isTatkal = String(bookingType).toUpperCase() === 'TATKAL';
  const effectiveTatkal = isTatkal ? (tatkalCharge || 150) : (tatkalCharge || 0);
  const trans = transportationCharge || 50;
  const total = totalAmount || estimatedTotal || (labourAmount + trans + effectiveTatkal);

  let detailLines = '';
  detailLines += `⚡ *बुकिंग प्रकार:* ${isTatkal ? 'TATKAL (तत्काल — 6 घंटे बाद लेबर डिलीवरी)' : 'NORMAL (सामान्य)'}\n`;

  if (serviceType === 'loading_unloading' || serviceName.includes('Loading')) {
    const bagCount = numberOfBags || 50;
    const finalWorkers = Math.max(1, workerCount);
    const bagRate = serviceRate || 4;
    const dist = carryingDistance || '20m';

    detailLines +=
      `📌 *काम का प्रकार:* Loading / Unloading\n` +
      `👷 *मजदूरों की संख्या:* ${finalWorkers} मजदूर\n` +
      `👜 *बैगों की संख्या:* ${bagCount} बैग\n` +
      `📏 *दूरी (Carrying Distance):* ${dist}\n` +
      `💰 *दर (Rate):* ₹${bagRate} / बैग\n` +
      `💵 *मजदूरी शुल्क:* ₹${labourAmount}\n` +
      `🚚 *ट्रांसपोर्टेशन शुल्क:* ₹${trans}\n` +
      (isTatkal ? `⚡ *तत्काल चार्ज:* ₹${effectiveTatkal} (6 घंटे बाद लेबर )\n` : '') +
      `-----------------------------\n` +
      `💳 *कुल राशि:* ₹${total} (₹50 ट्रांसपोर्टेशन शामिल)`;
  } else if (serviceType === 'hourly' || serviceName.includes('Hourly')) {
    const hours = durationHours || 4;

    detailLines +=
      `📌 *काम का प्रकार:* ${serviceName}\n` +
      `👷 *मजदूरों की संख्या:* ${workerCount} मजदूर\n` +
      `⏱️ *काम का समय:* ${hours} घंटे\n` +
      `💵 *मजदूरी शुल्क:* ₹${labourAmount}\n` +
      `🚚 *ट्रांसपोर्टेशन शुल्क:* ₹${trans}\n` +
      (isTatkal ? `⚡ *तत्काल चार्ज:* ₹${effectiveTatkal} (6 घंटे बाद लेबर)\n` : '') +
      `-----------------------------\n` +
      `💳 *कुल राशि:* ₹${total} (₹50 ट्रांसपोर्टेशन शामिल)`;
  } else {
    detailLines +=
      `📌 *काम का प्रकार:* ${serviceName}\n` +
      `👷 *मजदूरों की संख्या:* ${workerCount} मजदूर\n` +
      `📅 *तारीख:* ${date} ${isTatkal ? `(${startTime})` : ''}\n` +
      `💵 *मजदूरी शुल्क:* ₹${labourAmount}\n` +
      `🚚 *ट्रांसपोर्टेशन शुल्क:* ₹${trans}\n` +
      (isTatkal ? `⚡ *तत्काल चार्ज:* ₹${effectiveTatkal} (6 घंटे बाद लेबर)\n` : '') +
      `-----------------------------\n` +
      `💳 *कुल राशि:* ₹${total} (₹50 ट्रांसपोर्टेशन शामिल)`;
  }

  // Location section formatting
  let locationBlock = '';
  if (workLocation && workLocation.address) {
    const lat = workLocation.latitude || 28.4089;
    const lng = workLocation.longitude || 77.8498;
    const mapsUrl = `https://www.google.com/maps?q=${lat},${lng}`;
    locationBlock =
      `📍 *काम की जगह:* ${workLocation.address}\n\n` +
      `🗺️ *काम की लोकेशन:*\n${mapsUrl}\n\n`;
  } else {
    locationBlock = `📍 *काम की जगह:* Bulandshahr, Uttar Pradesh\n\n`;
  }

  const message =
    `🏗️ *KaamWale — मजदूर बुकिंग अनुरोध*\n\n` +
    `${detailLines}\n\n` +
    locationBlock +
    (workNotes ? `📝 *काम का विवरण:* ${workNotes}\n\n` : '') +
    `कृपया उपलब्ध मजदूरों की पुष्टि करें। धन्यवाद! 🙏`;

  return encodeURIComponent(message);
};

export const KAAMWALE_PHONE = '+919762658206';

export const openWhatsApp = (options = {}) => {
  if (typeof options === 'string') {
    const isTatkal = options.toLowerCase().includes('tatkal');
    options = { serviceName: options, bookingType: isTatkal ? 'TATKAL' : 'NORMAL' };
  }
  const msg = buildWhatsAppMessage(options);
  const cleanPhone = KAAMWALE_PHONE.replace(/\D/g, '');
  const url = `https://wa.me/${cleanPhone}?text=${msg}`;
  const win = window.open(url, '_blank', 'noopener,noreferrer');
  if (!win || win.closed || typeof win.closed === 'undefined') {
    window.location.href = url;
  }
};

