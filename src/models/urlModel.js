const db = require("../config/db");

exports.create = async (originalUrl, shortCode) => {
  const [result] = await db.execute(
    "INSERT INTO urls (original_url, short_code) VALUES (?, ?)",
    [originalUrl, shortCode]
  );
  return result;
};

exports.findByCode = async (shortCode) => {
  const [rows] = await db.execute(
    "SELECT * FROM urls WHERE short_code = ?",
    [shortCode]
  );
  return rows[0];
};

exports.incrementClicks = async (shortCode) => {
  await db.execute(
    "UPDATE urls SET clicks = clicks + 1 WHERE short_code = ?",
    [shortCode]
  );
};

exports.findAll = async () => {
  const [rows] = await db.execute("SELECT * FROM urls");
  return rows;
};
