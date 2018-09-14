const normalizeImage = data => {
  data.image = process.env.PUBLIC_URL + data.image;
  return data;
};

module.exports = normalizeImage;
