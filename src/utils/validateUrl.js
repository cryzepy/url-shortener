function validateUrl(url) {
  try {
    const parsedUrl = new URL(url);

    // hanya izinkan http dan https
    if (parsedUrl.protocol !== "http:" && parsedUrl.protocol !== "https:") {
      return false;
    }

    return true;
  } catch (error) {
    return false;
  }
}

module.exports = validateUrl;
