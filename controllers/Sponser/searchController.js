var Sponser = require('../../models/Sponser');

exports.sponserSearch = async function (req, res) {
  let keyword = req.params.keyword;
  let docs;

  // if (keyword.length < 2) {
  //   return res.status(404).send();
  // }

  try {
    docs = await Sponser.find({
      $or: [
        { name: { $regex: '.*' + keyword + '.*' } },
        { url: { $regex: '.*' + keyword + '.*' } }
      ]
    });
  } catch (err) {
    return res.status(500).send();
  }

  if (docs.length === 0) {
    return res.status(404).send();
  } else {
    var mappedDocs = await Promise.all(
      docs.map(async function (doc) {
        return doc.toJSON();
      })
    );
    return res.status(200).send(JSON.stringify({ data: mappedDocs }));
  }
};
