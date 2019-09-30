const DataLoader = require('dataloader');

const User = require('../../models/user');
const Group = require('../../models/group');
const Perk = require('../../models/perk');
const Content = require('../../models/content');
const Action = require('../../models/action');
const Interaction = require('../../models/interaction');
const Search = require('../../models/search');

const { dateToString } = require('../../helpers/date');

const userLoader = new DataLoader(userIds => {
  return users(userIds);
});
const contentLoader = new DataLoader(contentIds => {
  return contents(contentIds);
});

// const userLoader = new DataLoader(userIds => {
//   return User.find({ _id: { $in: userIds } });
// });

const users = async userIds => {
  try {
    const users = await User.find({ _id: { $in: userIds } });
    users.sort((a, b) => {
      return (
        userIds.indexOf(a._id.toString()) - userIds.indexOf(b._id.toString())
      );
    });
    return users.map(user => {
      return transformUser(user);
    });
  } catch (err) {
    throw err;
  }
};
const contents = async contentIds => {
  try {
    const contents = await Content.find({ _id: { $in: contentIds } });
    contents.sort((a, b) => {
      return (
        contentIds.indexOf(a._id.toString()) - contentIds.indexOf(b._id.toString())
      );
    });
    return contents.map(content => {
      return transformContent(content);
    });
  } catch (err) {
    throw err;
  }
};

const singleUser = async userId => {
  try {
    const user = await userLoader.load(userId.toString());
    return user;
  } catch (err) {
    throw err;
  }
};
const singleContent = async contentId => {
  try {
    const content = await contentLoader.load(contentId.toString());
    return content;
  } catch (err) {
    throw err;
  }
};

// const user = async userId => {
//   try {
//     const user = await userLoader.load(userId.toString());
//     return {
//       ...user._doc,
//       _id: user.id,
//       createdEvents: () => eventLoader.loadMany(user._doc.createdEvents)
//     };
//   } catch (err) {
//     throw err;
//   }
// };

const transformUser = user => {
  return {
    ...user._doc,
    _id: user.id,
    name: user.name,
    username: user.username
  };
};
const transformContent = content => {
  return {
    ...content._doc,
    _id: content.id,
    createdAt: content.createdAt,
    updatedAt: content.updatedAt,
    title: content.title,
    domain: content.domain,
    category: content.category,
    creator: content.creator
  };
};

// const transformBooking = booking => {
//   return {
//     ...booking._doc,
//     _id: booking.id,
//     user: user.bind(this, booking._doc.user),
//     event: singleEvent.bind(this, booking._doc.event),
//     createdAt: dateToString(booking._doc.createdAt),
//     updatedAt: dateToString(booking._doc.updatedAt)
//   };
// };

exports.transformUser = transformUser;
exports.transformContent = transformContent;
// exports.transformBooking = transformBooking;

// exports.user = user;
// exports.events = events;
// exports.singleEvent = singleEvent;
