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
const groupLoader = new DataLoader(groupIds => {
  return groups(groupIds);
});
const actionLoader = new DataLoader(actionIds => {
  return actions(actionIds);
});
const perkLoader = new DataLoader(perkIds => {
  return perks(perkIds);
});
const searchLoader = new DataLoader(searchIds => {
  return searches(searchIds);
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
const groups = async groupIds => {
  try {
    const groups = await Group.find({ _id: { $in: groupIds } });
    groups.sort((a, b) => {
      return (
        groupIds.indexOf(a._id.toString()) - groupIds.indexOf(b._id.toString())
      );
    });
    return groups.map(group => {
      return transformGroup(group);
    });
  } catch (err) {
    throw err;
  }
};
const actions = async actionIds => {
  try {
    const actions = await Action.find({ _id: { $in: actionIds } });
    actions.sort((a, b) => {
      return (
        actionIds.indexOf(a._id.toString()) - actionIds.indexOf(b._id.toString())
      );
    });
    return actions.map(action => {
      return transformAction(action);
    });
  } catch (err) {
    throw err;
  }
};
const perks = async perkIds => {
  try {
    const perks = await Perk.find({ _id: { $in: perkIds } });
    perks.sort((a, b) => {
      return (
        perkIds.indexOf(a._id.toString()) - perkIds.indexOf(b._id.toString())
      );
    });
    return perks.map(perk => {
      return transformPerk(perk);
    });
  } catch (err) {
    throw err;
  }
};
const searchs = async searchIds => {
  try {
    const searches = await Search.find({ _id: { $in: searchIds } });
    searches.sort((a, b) => {
      return (
        searchIds.indexOf(a._id.toString()) - searchIds.indexOf(b._id.toString())
      );
    });
    return searches.map(search => {
      return transformSearch(search);
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
const singleGroup = async groupId => {
  try {
    const group = await groupLoader.load(groupId.toString());
    return group;
  } catch (err) {
    throw err;
  }
};
const singleAction = async actionId => {
  try {
    const action = await actionLoader.load(actionId.toString());
    return action;
  } catch (err) {
    throw err;
  }
};
const singlePerk = async perkId => {
  try {
    const perk = await perkLoader.load(perkId.toString());
    return perk;
  } catch (err) {
    throw err;
  }
};
const singleSearch = async searchId => {
  try {
    const search = await searchLoader.load(searchId.toString());
    return search;
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
    type: content.type,
    subtype: content.subtype,
    name: content.name,
    description: content.description,
    users: content.users,
    actions: content.actions
  };
};
const transformGroup = group => {
  return {
    ...group._doc,
    _id: group.id,
    createdAt: group.createdAt,
    updatedAt: group.updatedAt,
    type: group.type,
    subtype: group.subtype,
    name: group.name,
    description: group.description,
    users: group.users,
    actions: group.actions
  };
};
const transformAction = action => {
  return {
    ...action._doc,
    _id: action.id,
    title: action.title,
    domain: action.domain,
    category: action.category,
    creator: action.creator,
    description: action.description
  };
};
const transformPerk = perk => {
  return {
    ...perk._doc,
    _id: perk.id,
    name: perk.name,
    description: perk.description,
    type: perk.type,
    subtype: perk.subtype,
    data: perk.data,
    users: perk.users,
    groups: perk.groups,
    content: perk.content,
    tags: perk.tags
  };
};
const transformSearch = perk => {
  return {
    ...search._doc,
    _id: search.id,
    type: search.type,
    user: search.user,
    query: search.query,
    response: search.response,
    actions: search.actions,
    tags: search.tags
  };
};

exports.transformUser = transformUser;
exports.transformContent = transformContent;
exports.transformGroup = transformGroup;
exports.transformAction = transformAction;
exports.transformPerk = transformPerk;
exports.transformSearch = transformSearch;
