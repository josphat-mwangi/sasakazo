const authBase64 = (consumer_key, consumer_secret) => {
    let buffer = Buffer.from(`${consumer_key}:${consumer_secret}`).toString(
      "base64"
    );
    return buffer;
};
  
module.exports = authBase64;
  