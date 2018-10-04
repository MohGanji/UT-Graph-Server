var User = require('../../models/User');
var getUserEvents = require('../../utils/getUserEvents');

exports.getUserByUsername = async function (req, res) {
  let username = req.params.username;

  try {
    var user = await User.findOne({ username: username });
  } catch (err) {
    return res.status(500).send();
  }

  if (user) {
    let eventsAsAdmin = await getUserEvents(user, 'ORGANIZER');
    let eventsAsAttendent = await getUserEvents(user, 'ATTENDENT');
    let eventsAsStaff = await getUserEvents(user, 'STAFF');

    return res.status(200).send(
      JSON.stringify({
        data: {
          user: await user.toJSON(),
          eventsAsAdmin,
          eventsAsAttendent,
          eventsAsStaff
        }
      })
    );
  } else {
    return res.status(404).send();
  }
};

exports.getUserEvents = async function (req, res) {
  let username = req.params.username;

  try {
    var user = await User.findOne({ username: username });
  } catch (err) {
    return res.status(500).send();
  }

  if (user) {
    let eventsAsAdmin = await getUserEvents(user, 'ADMIN');
    let eventsAsAttendent = await getUserEvents(user, 'ATTENDENT');
    let eventsAsStaff = await getUserEvents(user, 'STAFF');

    return res.status(200).send(
      JSON.stringify({
        data: {
          eventsAsAdmin,
          eventsAsAttendent,
          eventsAsStaff
        }
      })
    );
  } else {
    return res.status(404).send();
  }
};
