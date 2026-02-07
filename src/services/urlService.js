const urlModel = require("../models/urlModel");
const generateShortCode = require("../utils/generateCode");
const validateUrl = require("../utils/validateUrl")
const QRCode = require("qrcode");

exports.createShortUrl = async (originalUrl, host) => {

  if (!validateUrl(originalUrl)) {
    throw new Error("Invalid URL format");
  }
  const shortCode = generateShortCode();

  await urlModel.create(originalUrl, shortCode);

   const shortUrl = `${host}/${shortCode}`;

  // generate QR dalam bentuk base64
  const qrCode = await QRCode.toDataURL(shortUrl);


  return {
    originalUrl,
    shortCode,
    shortUrl,
    qrCode
  };
};

exports.getAllUrls = async (host) => {
  const urls = await urlModel.findAll();

  // generate QR untuk setiap url
  const urlsWithQR = await Promise.all(
    urls.map(async (url) => {
      const shortUrl = `${host}/${url.short_code}`;
      const qrCode = await QRCode.toDataURL(shortUrl);

      return {
        ...url,
        shortUrl,
        qrCode,
      };
    })
  );

  return urlsWithQR;
};

exports.getOriginalUrl = async (shortCode) => {
  const url = await urlModel.findByCode(shortCode);

  if (!url) {
    throw new Error("URL not found");
  }

  await urlModel.incrementClicks(shortCode);

  return url.original_url;
};
