var Sponser = require('../../models/Sponser');
var normalizeImage = require('../../utils/normalizeImage');

exports.createSponser = async function (req, res) {
  var name = req.body.data.name;
  var url = req.body.data.url;
  var image = 'default.jpg';

  let newSponser;
  try {
    newSponser = await Sponser.create({
      name: name,
      url: url,
      image: image
    });
  } catch (err) {
    res.status(500).send();
  }

  let sponserId = newSponser._id;

  return res.status(200).send(JSON.stringify({ data: sponserId }));
};

exports.getSponser = async function (req, res) {
  let sponsers = await Sponser.find({});

  let mappedSponsers = await Promise.all(
    sponsers.map(async function (sponser) {
      return normalizeImage(sponser.toJSON());
    })
  );

  return res.status(200).send({ data: mappedSponsers });
};
