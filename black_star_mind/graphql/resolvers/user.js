const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const DataLoader = require('dataloader');

const User = require('../../models/user');
const Group = require('../../models/group');
const Perk = require('../../models/perk');
const Content = require('../../models/content');
const Action = require('../../models/action');
const Interaction = require('../../models/interaction');
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
  updateUser: async (args, req) => {
    if (!req.isAuth) {
      throw new Error('Unauthenticated!');
    }
    console.log(JSON.stringify(args));
    try {

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
    } catch (err) {
      throw err;
    }
  },
  updateUserSocial: async (args, req) => {
    if (!req.isAuth) {
      throw new Error('Unauthenticated!');
    }
    console.log(JSON.stringify(args));
    try {
      const user = await User.findOneAndUpdate({_id:args.userId},{$push: {socialMedia:args.userSocial}},{new: true});
        return {
            ...user._doc,
            _id: user.id,
            name: user.name,
            username: user.username,
            email: user.email,
            socialMedia: user.socialMedia
        };
    } catch (err) {
      throw err;
    }
  },
  updateUserDemographics: async (args, req) => {
    if (!req.isAuth) {
      throw new Error('Unauthenticated!');
    }
    console.log(JSON.stringify(args));
    try {
      const user = await User.findOneAndUpdate({_id:args.userId},{$push: {demographics:args.userGraphicsInput}},{new: true});
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
    } catch (err) {
      throw err;
    }
  },
  updateUserBiographics: async (args, req) => {
    if (!req.isAuth) {
      throw new Error('Unauthenticated!');
    }
    console.log(JSON.stringify(args));
    try {
      const user = await User.findOneAndUpdate({_id:args.userId},{$push: {biographics:args.userGraphicsInput}},{new: true});
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
    } catch (err) {
      throw err;
    }
  },
  updateUserPsychographics: async (args, req) => {
    if (!req.isAuth) {
      throw new Error('Unauthenticated!');
    }
    console.log(JSON.stringify(args));
    try {
      const user = await User.findOneAndUpdate({_id:args.userId},{$push: {psychgraphics:args.userGraphicsInput}},{new: true});
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
    } catch (err) {
      throw err;
    }
  },
  updateUserConsumption: async (args, req) => {
    if (!req.isAuth) {
      throw new Error('Unauthenticated!');
    }
    console.log(JSON.stringify(args));
    try {
      const user = await User.findOneAndUpdate({_id:args.userId},{$push: {consumption:args.userConsumptionInput}},{new: true});
        return {
            ...user._doc,
            _id: user.id,
            name: user.name,
            username: user.username,
            email: user.email,
            consumption: user.consumption
        };
    } catch (err) {
      throw err;
    }
  },
  updateUserGroup: async (args, req) => {
    if (!req.isAuth) {
      throw new Error('Unauthenticated!');
    }
    console.log(JSON.stringify(args));
    try {
      const user = await User.findOneAndUpdate({_id:args.userId},{$push: {groups:args.userRefInput}},{new: true});
        return {
            ...user._doc,
            _id: user.id,
            name: user.name,
            username: user.username,
            email: user.email,
            groups: user.groups
        };
    } catch (err) {
      throw err;
    }
  },
  updateUserContent: async (args, req) => {
    if (!req.isAuth) {
      throw new Error('Unauthenticated!');
    }
    console.log(JSON.stringify(args));
    try {
      const user = await User.findOneAndUpdate({_id:args.userId},{$push: {content:args.contentRefInput}},{new: true});
        return {
            ...user._doc,
            _id: user.id,
            name: user.name,
            username: user.username,
            email: user.email,
            content: user.content
        };
    } catch (err) {
      throw err;
    }
  },
  updateUserAction: async (args, req) => {
    if (!req.isAuth) {
      throw new Error('Unauthenticated!');
    }
    console.log(JSON.stringify(args));
    try {
      const user = await User.findOneAndUpdate({_id:args.userId},{$push: {actions:args.actionRefInput}},{new: true});
        return {
            ...user._doc,
            _id: user.id,
            name: user.name,
            username: user.username,
            email: user.email,
            actions: user.actions,
        };
    } catch (err) {
      throw err;
    }
  },
  deleteUser: async (args, req) => {
    if (!req.isAuth) {
      throw new Error('Unauthenticated!');
    }
    // console.log(JSON.stringify(args));
    try {
      const user = await User.findByIdAndRemove(args.userId);
      // const user = await User.findById(userId);
        return {
            ...user._doc,
            _id: user.id,
            username: user.username
        };
    } catch (err) {
      throw err;
    }
  },
  createUser: async args => {
    // console.log(JSON.stringify(args));
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
