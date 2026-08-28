// Hindi WhatsApp message helper — KaamWale.com
// Used across all pages for consistent pure Hindi messages

export const buildWhatsAppMessage = (serviceName = '', hours = null, workerCount = null) => {
  const serviceStr = serviceName ? `मुझे *${serviceName}* के लिए मजदूर चाहिए।` : 'मुझे मजदूर चाहिए।';
  const workerStr = workerCount ? `\nमजदूरों की संख्या: ${workerCount}` : '';
  const hoursStr = hours ? `\nकाम का समय: ${hours} घंटे` : '';

  return encodeURIComponent(
    `🙏 नमस्ते KaamWale!\n\n${serviceStr}${workerStr}${hoursStr}\n📍 जगह: बुलंदशहर\n\nकृपया उपलब्ध मजदूरों की जानकारी दें।\nधन्यवाद! 🙏`
  );
};

export const KAAMWALE_PHONE = '+916395882126';
