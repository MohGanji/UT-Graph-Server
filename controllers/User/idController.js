var User = require('../../models/User');
var UserEvent = require('../../models/UserEvent');
let Event = require('../../models/Event');
var normalizeImage = require('../../utils/normalizeImage');

exports.getUserByUsername = async function (req, res) {
  let username = req.params.id;

  try {
    var user = await User.findOne({ username: username });
  } catch (err) {
    return res.status(500).send();
  }

  if (user) {
    normalizeImage(user.toJSON());
    return res
      .status(200)
      .send(JSON.stringify({ data: await normalizeImage(user.toJSON()) }));
  } else {
    return res.status(404).send();
  }
};

exports.getUserEvents = async function (req, res) {
  let username = req.params.id;
  let user = await User.findOne({ username: username });

  if (!user) {
    return res.status(404).send();
  }

  let userId = user._id;
  let docs, events;

  try {
    docs = await UserEvent.find({ user: userId });
    events = await Promise.all(
      docs.map(async function (doc) {
        let event = await Event.findOne({ _id: doc.event });
        event.role = doc.role;
        return normalizeImage(event);
      })
    );
  } catch (err) {
    return res.status(500).send();
  }
  return res.status(200).send(JSON.stringify({ data: events }));
};
