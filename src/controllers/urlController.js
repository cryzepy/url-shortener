const urlService = require("../services/urlService");

exports.create = async (req, res, next) => {
  try {
    const { originalUrl } = req.body;

    if (!originalUrl) {
      return res.status(400).json({ message: "Original URL required" });
    }

    const host = `${req.protocol}://${req.get("host")}`;
    const result = await urlService.createShortUrl(originalUrl, host);

    res.status(201).json({
      message: "Short URL created",
      shortUrl: result.shortUrl,
      qrCode: result.qrCode
    });
  } catch (error) {
    next(error);
  }
};

exports.getAll = async (req, res, next) => {
  try {
    const urls = await urlService.getAllUrls();
    res.json(urls);
  } catch (error) {
    next(error);
  }
};
