const normalizeImage = data => {
  console.log('data image normalize');
  console.log(data);
  data.image = process.env.PUBLIC_URL + data.image;
  return data;
};

module.exports = normalizeImage;
