const Friend = require('../models/friend');

module.exports = {
  getRelationship: async (userId, profileId) => {
  const realationship = await Friend.findOne({
    $or: [
      { sender: userId, recipient: profileId },
      { sender: profileId, recipient: userId },
    ],
  });

  const friendship = {
    friends: realationship?.requestStatus === 'accepted' ? true : false,
    requestSent:
      realationship?.sender.toString() === userId &&
      realationship?.requestStatus === 'pending'
        ? true
        : false,
    requestReceived:
      realationship?.sender.toString() === profileId &&
      realationship?.requestStatus === 'pending'
        ? true
        : false,
    requestID: realationship?.id ? realationship?.id : null,
  };

  return friendship;
}
}