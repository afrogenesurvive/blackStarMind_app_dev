const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const DataLoader = require('dataloader');

const User = require('../../models/user');
const Group = require('../../models/group');
const Perk = require('../../models/perk');
const Content = require('../../models/content');
const Action = require('../../models/action');
const Search = require('../../models/search');

const { transformUser } = require('./merge');
const { dateToString } = require('../../helpers/date');
const { pocketVariables } = require('../../helpers/pocketVars');

module.exports = {
  users: async (args, req) => {
    if (!req.isAuth) {
      throw new Error('Unauthenticated!');
    }
    try {
      const users = await User.find();
      return users.map(user => {
        return transformUser(user);
      });
    } catch (err) {
      throw err;
    }
    console.log("req =  " + req);
  },
  getThisUser: async (args, req) => {
    if (!req.isAuth) {
      throw new Error('Unauthenticated!');
    }
    try {
      const user = await User.findById(req.userId);
        return {
            ...user._doc,
            _id: user.id,
            name: user.name,
            username: user.username
        };
    } catch (err) {
      throw err;
    }
  },
  getUserId: async (args, req) => {
    if (!req.isAuth) {
      throw new Error('Unauthenticated!');
    }
    try {
      const user = await User.findById(args.userId);
        return {
            ...user._doc,
            _id: user.id,
            name: user.name,
            username: user.username
        };
    } catch (err) {
      throw err;
    }
  },
  getUserUsername: async (args, req) => {
    if (!req.isAuth) {
      throw new Error('Unauthenticated!');
    }
    try {
      const user = await User.findOne({username: args.username});
        return {
            ...user._doc,
            _id: user.id,
            name: user.name,
            username: user.username
        };
    } catch (err) {
      throw err;
    }
  },
  getUserEmail: async (args, req) => {
    if (!req.isAuth) {
      throw new Error('Unauthenticated!');
    }
    try {
      const user = await User.findOne({email: args.email})
        return {
            ...user._doc,
            _id: user.id,
            name: user.name,
            username: user.username,
            email: user.email
        };
    } catch (err) {
      throw err;
    }
  },
  getUserFriend: async (args, req) => {
    if (!req.isAuth) {
      throw new Error('Unauthenticated!');
    }
    try {
      const users = await User.find({'friends.username': args.userRefInput.username});
      return users.map(user => {
        return transformUser(user);
      });
        // {
        //     ...group._doc,
        // _id: group.id,
        // type: group.type,
        // subtype: group.subtype,
        // name: group.name,
        // description: group.description,
        // users: group.users,
        // actions: group.actions
        // };
    } catch (err) {
      throw err;
    }
  },
  getUserGroup: async (args, req) => {
    if (!req.isAuth) {
      throw new Error('Unauthenticated!');
    }
    try {
      const users = await User.find({'groups.name': args.userRefInput.username});
      return users.map(user => {
        return transformUser(user);
      });
        // {
        //     ...group._doc,
        // _id: group.id,
        // type: group.type,
        // subtype: group.subtype,
        // name: group.name,
        // description: group.description,
        // users: group.users,
        // actions: group.actions
        // };
    } catch (err) {
      throw err;
    }
  },
  getUserContent: async (args, req) => {
    if (!req.isAuth) {
      throw new Error('Unauthenticated!');
    }
    try {
      const users = await User.find({'content.title': args.contentRefInput.title});
      return users.map(user => {
        return transformUser(user);
      });
        // {
        //     ...group._doc,
        // _id: group.id,
        // type: group.type,
        // subtype: group.subtype,
        // name: group.name,
        // description: group.description,
        // users: group.users,
        // actions: group.actions
        // };
    } catch (err) {
      throw err;
    }
  },
  getUserPerk: async (args, req) => {
    if (!req.isAuth) {
      throw new Error('Unauthenticated!');
    }
    try {
      const users = await User.find({'perk.name': args.perkRefInput.name});
      return users.map(user => {
        return transformUser(user);
      });
        // {
        //     ...group._doc,
        // _id: group.id,
        // type: group.type,
        // subtype: group.subtype,
        // name: group.name,
        // description: group.description,
        // users: group.users,
        // actions: group.actions
        // };
    } catch (err) {
      throw err;
    }
  },
  getUserActionType: async (args, req) => {
    if (!req.isAuth) {
      throw new Error('Unauthenticated!');
    }
    try {
      const users = await User.find({'actions.type': args.actionRefInput.type});
      return users.map(user => {
        return transformUser(user);
      });
        // {
        //     ...group._doc,
        // _id: group.id,
        // type: group.type,
        // subtype: group.subtype,
        // name: group.name,
        // description: group.description,
        // users: group.users,
        // actions: group.actions
        // };
    } catch (err) {
      throw err;
    }
  },
  getUserSearchType: async (args, req) => {
    if (!req.isAuth) {
      throw new Error('Unauthenticated!');
    }
    try {
      const users = await User.find({'searches.type': args.searchRefInput.type});
      return users.map(user => {
        return transformUser(user);
      });
        // {
        //     ...group._doc,
        // _id: group.id,
        // type: group.type,
        // subtype: group.subtype,
        // name: group.name,
        // description: group.description,
        // users: group.users,
        // actions: group.actions
        // };
    } catch (err) {
      throw err;
    }
  },
  updateUser: async (args, req) => {
    if (!req.isAuth) {
      throw new Error('Unauthenticated!');
    }
    try {
      // Check request maker id matches user id
      const owner = await User.findById(args.userId);
      if (owner._id != pocketVariables.user._id ) {
        throw new Error('Not the creator! No edit permission');
      } else if (owner.id == pocketVariables.user._id) {

      const hashedPassword = await bcrypt.hash(args.userInput.password, 12);
      const user = await User.findOneAndUpdate({_id:args.userId},{
        // {
        email: args.userInput.email,
        password: hashedPassword,
        name: args.userInput.name,
        username: args.userInput.username,
        phone: args.userInput.phone,
        address: args.userInput.address
      // }
      },{new: true});
        return {
            ...user._doc,
            _id: user.id,
            name: user.name,
            username: user.username,
            phone: user.phone,
            address: user.address
        };
      }
    } catch (err) {
      throw err;
    }
  },
  updateUserSocial: async (args, req) => {
    if (!req.isAuth) {
      throw new Error('Unauthenticated!');
    }
    try {
      // Check request maker id matches user id
      const owner = await User.findById(args.userId);
      if (owner._id != pocketVariables.user._id ) {
        throw new Error('Not the creator! No edit permission');
      } else if (owner.id == pocketVariables.user._id) {

      const user = await User.findOneAndUpdate({_id:args.userId},{$addToSet: {socialMedia:args.userSocial}},{new: true});
        return {
            ...user._doc,
            _id: user.id,
            name: user.name,
            username: user.username,
            email: user.email,
            socialMedia: user.socialMedia
        };
      }
    } catch (err) {
      throw err;
    }
  },
  updateUserDemographics: async (args, req) => {
    if (!req.isAuth) {
      throw new Error('Unauthenticated!');
    }
    try {
      // Check request maker id matches user id
      const owner = await User.findById(args.userId);
      if (owner._id != pocketVariables.user._id ) {
        throw new Error('Not the creator! No edit permission');
      } else if (owner.id == pocketVariables.user._id) {

      const user = await User.findOneAndUpdate({_id:args.userId},{$addToSet: {demographics:args.userGraphicsInput}},{new: true});
        return {
            ...user._doc,
            _id: user.id,
            name: user.name,
            username: user.username,
            email: user.email,
            demographics: user.demographics,
            biographics: user.biographics,
            psychographics: user.psychographics
        };
      }
    } catch (err) {
      throw err;
    }
  },
  updateUserBiographics: async (args, req) => {
    if (!req.isAuth) {
      throw new Error('Unauthenticated!');
    }
    try {
      // Check request maker id matches user id
      const owner = await User.findById(args.userId);
      if (owner._id != pocketVariables.user._id ) {
        throw new Error('Not the creator! No edit permission');
      } else if (owner.id == pocketVariables.user._id) {

      const user = await User.findOneAndUpdate({_id:args.userId},{$addToSet: {biographics:args.userGraphicsInput}},{new: true});
        return {
            ...user._doc,
            _id: user.id,
            name: user.name,
            username: user.username,
            email: user.email,
            demographics: user.demographics,
            biographics: user.biographics,
            psychographics: user.psychographics
        };
      }
    } catch (err) {
      throw err;
    }
  },
  updateUserPsychographics: async (args, req) => {
    if (!req.isAuth) {
      throw new Error('Unauthenticated!');
    }
    try {
      // Check request maker id matches user id
      const owner = await User.findById(args.userId);
      if (owner._id != pocketVariables.user._id ) {
        throw new Error('Not the creator! No edit permission');
      } else if (owner.id == pocketVariables.user._id) {

      const user = await User.findOneAndUpdate({_id:args.userId},{$addToSet: {psychgraphics:args.userGraphicsInput}},{new: true});
        return {
            ...user._doc,
            _id: user.id,
            name: user.name,
            username: user.username,
            email: user.email,
            demographics: user.demographics,
            biographics: user.biographics,
            psychographics: user.psychographics
        };
      }
    } catch (err) {
      throw err;
    }
  },
  updateUserConsumption: async (args, req) => {
    if (!req.isAuth) {
      throw new Error('Unauthenticated!');
    }
    try {
      // Check request maker id matches user id
      const owner = await User.findById(args.userId);
      if (owner._id != pocketVariables.user._id ) {
        throw new Error('Not the creator! No edit permission');
      } else if (owner.id == pocketVariables.user._id) {

      const user = await User.findOneAndUpdate({_id:args.userId},{$addToSet: {consumption:args.userConsumptionInput}},{new: true});
        return {
            ...user._doc,
            _id: user.id,
            name: user.name,
            username: user.username,
            email: user.email,
            consumption: user.consumption
        };
      }
    } catch (err) {
      throw err;
    }
  },
  updateUserGroup: async (args, req) => {
    if (!req.isAuth) {
      throw new Error('Unauthenticated!');
    }
    try {
      // Check request maker id matches user id
      const owner = await User.findById(args.userId);
      if (owner._id != pocketVariables.user._id ) {
        throw new Error('Not the creator! No edit permission');
      } else if (owner.id == pocketVariables.user._id) {
      // Check for duplicates//

        const user = await User.findOneAndUpdate({_id:args.userId},{$addToSet: {groups:args.groupRefInput}},{new: true});
          return {
              ...user._doc,
              _id: user.id,
              name: user.name,
              username: user.username,
              email: user.email,
              groups: user.groups
          };

      }
    } catch (err) {
      throw err;
    }
  },
  updateUserFriend: async (args, req) => {
    if (!req.isAuth) {
      throw new Error('Unauthenticated!');
    }
    try {
      // Check request maker id matches user id
      const owner = await User.findById(args.userId);
      if (owner._id != pocketVariables.user._id ) {
        throw new Error('Not the creator! No edit permission');
      } else if (owner.id == pocketVariables.user._id) {
      // Check for duplicates//

        const user = await User.findOneAndUpdate({_id:args.userId},{$addToSet: {friends:args.userRefInput}},{new: true});
          return {
              ...user._doc,
              _id: user.id,
              name: user.name,
              username: user.username,
              email: user.email,
              friends: user.friends
          };

      }
    } catch (err) {
      throw err;
    }
  },
  updateUserContent: async (args, req) => {
    if (!req.isAuth) {
      throw new Error('Unauthenticated!');
    }
    try {
      // Check request maker id matches user id
      const owner = await User.findById(args.userId);
      if (owner._id != pocketVariables.user._id ) {
        throw new Error('Not the creator! No edit permission');
      } else if (owner.id == pocketVariables.user._id) {

      // Check for duplicates//

      const user = await User.findOneAndUpdate({_id:args.userId},{$addToSet: {content:args.contentRefInput}},{new: true});
        return {
            ...user._doc,
            _id: user.id,
            name: user.name,
            username: user.username,
            email: user.email,
            content: user.content
        };
      }
    } catch (err) {
      throw err;
    }
  },
  updateUserAction: async (args, req) => {
    if (!req.isAuth) {
      throw new Error('Unauthenticated!');
    }
    try {
      // Check request maker id matches user id
      const owner = await User.findById(args.userId);
      if (owner._id != pocketVariables.user._id ) {
        throw new Error('Not the creator! No edit permission');
      } else if (owner.id == pocketVariables.user._id) {

      const user = await User.findOneAndUpdate({_id:args.userId},{$addToSet: {actions:args.actionRefInput}},{new: true});
        return {
            ...user._doc,
            _id: user.id,
            name: user.name,
            username: user.username,
            email: user.email,
            actions: user.actions
        };
      }
    } catch (err) {
      throw err;
    }
  },
  updateUserPerk: async (args, req) => {
    if (!req.isAuth) {
      throw new Error('Unauthenticated!');
    }
    try {
      // Check request maker id matches user id
      const owner = await User.findById(args.userId);
      if (owner._id != pocketVariables.user._id ) {
        throw new Error('Not the creator! No edit permission');
      } else if (owner.id == pocketVariables.user._id) {

      const user = await User.findOneAndUpdate({_id:args.userId},{$addToSet: {perks:args.perkRefInput}},{new: true});
        return {
            ...user._doc,
            _id: user.id,
            name: user.name,
            username: user.username,
            email: user.email,
            actions: user.actions
        };
      }
    } catch (err) {
      throw err;
    }
  },
  updateUserSearch: async (args, req) => {
    if (!req.isAuth) {
      throw new Error('Unauthenticated!');
    }
    try {
      // Check request maker id matches user id
      const owner = await User.findById(args.userId);
      if (owner._id != pocketVariables.user._id ) {
        throw new Error('Not the creator! No edit permission');
      } else if (owner.id == pocketVariables.user._id) {

      const user = await User.findOneAndUpdate({_id:args.userId},{$push: {searches:args.searchRefInput}},{new: true});
        return {
            ...user._doc,
            _id: user.id,
            name: user.name,
            username: user.username,
            email: user.email,
            actions: user.actions
        };
      }
    } catch (err) {
      throw err;
    }
  },
  deleteUser: async (args, req) => {
    if (!req.isAuth) {
      throw new Error('Unauthenticated!');
    }
    try {
      // Check request maker id matches user id
      const owner = await User.findById(args.userId);
      if (owner._id != pocketVariables.user._id ) {
        throw new Error('Not the creator! No edit permission');
      } else if (owner.id == pocketVariables.user._id) {

      const user = await User.findByIdAndRemove(args.userId);
      // const user = await User.findById(userId);
        return {
            ...user._doc,
            _id: user.id,
            username: user.username
        };
      }
    } catch (err) {
      throw err;
    }
  },
  createUser: async args => {
    try {
      const existingUser = await User.findOne({ email: args.userInput.email });
      if (existingUser) {
        throw new Error('User exists already.');
      }
      const hashedPassword = await bcrypt.hash(args.userInput.password, 12);

      const user = new User({
        email: args.userInput.email,
        password: hashedPassword,
        name: args.userInput.name,
        username: args.userInput.username,
        phone: args.userInput.phone,
        address: args.userInput.address,
        socialMedia: args.userInput.socialMedia,
        demographics: args.userInput.demographics,
        biographics: args.userInput.biographics,
        psychgraphics: args.userInput.psychgraphics,
        consumption: args.userInput.consumption,
        actions: args.userInput.actions,
        content: args.userInput.content,
        groups: args.userInput.groups,
        interactions: args.userInput.interactions,
        searches: args.userInput.searches,
        perks: args.userInput.perks
      });

      const result = await user.save();

      return {
        ...result._doc,
        password: hashedPassword,
        _id: result.id,
        email: result.email,
        name: result.name,
        username: result.username,
        phone: result.phone,
        address: result.address,
        socialMedia: result.socialMedia
      };
    } catch (err) {
      throw err;
    }
  },
};
