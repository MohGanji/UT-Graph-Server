var User = require('../../models/User');
var UserEvent = require('../../models/UserEvent');
let Event = require('../../models/Event');
var normalizeImage = require('../../utils/normalizeImage');

exports.getUserByUsername = async function (req, res) {
  let username = req.params.username;

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
  let username = req.params.username;
  let role = req.params.role;
  let user = await User.findOne({ username: username });

  if (!user) {
    return res.status(404).send();
  }

  let userId = user._id;
  let docs, events;

  try {
    docs = await UserEvent.find({ user: userId, role: role });
    events = await Promise.all(
      docs.map(async function (doc) {
        let event = await Event.findOne({ _id: doc.event });
        event.role = doc.role;
        return event;
      })
    );
  } catch (err) {
    return res.status(500).send();
  }
  var mappedEvents = await Promise.all(
    events.map(async function (event) {
      return normalizeImage(event.toJSON());
    })
  );
  return res.status(200).send(JSON.stringify({ data: mappedEvents }));
};
