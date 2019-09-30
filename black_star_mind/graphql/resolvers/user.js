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

module.exports = {
  users: async (req) => {
    // if (!req.isAuth) {
    //   throw new Error('Unauthenticated!');
    // }
    try {
      const users = await User.find();
      return users.map(user => {
        return transformUser(user);
      });
    } catch (err) {
      throw err;
    }
  },
  getThisUser: async (req) => {
    // if (!req.isAuth) {
    //   throw new Error('Unauthenticated!');
    // }
    // console.log(args.username);
    try {
      // const user = await User.findOne(args.username);
      const user = await User.findById(req.userId);
        return {
            ...user._doc,
            _id: user.id,
            email: user.email,
            password: user.password,
            name: user.name,
            username: user.username,
            phone: user.phone,
            address: user.address,
            socialMedia: args.user.socialMedia
        };
    } catch (err) {
      throw err;
    }
  },
  getUserId: async (args, req) => {
    // if (!req.isAuth) {
    //   throw new Error('Unauthenticated!');
    // }
    // console.log(args.username);
    try {
      // const user = await User.findOne(args.username);
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
    // if (!req.isAuth) {
    //   throw new Error('Unauthenticated!');
    // }
    // console.log(args.username);
    try {
      const user = await User.findOne({username: args.username});
      // const user = await User.findById(userId);
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
  updateUser: async (args, req) => {
    // if (!req.isAuth) {
    //   throw new Error('Unauthenticated!');
    // }
    console.log(JSON.stringify(args));
    try {
      const user = await User.findOneAndUpdate({_id:args.userId},{
        // {
        email: args.email,
        password: args.userInput.password,
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
            demographics: user.demographics

        };
    } catch (err) {
      throw err;
    }
  },
  updateUserGraphics: async (args, req) => {
    // if (!req.isAuth) {
    //   throw new Error('Unauthenticated!');
    // }
    console.log(JSON.stringify(args));
    try {
      const user = await User.findOneAndUpdate({_id:args.userId},{$push: {demographics:args.userGraphicsInput}},{new: true});
      // const user = await User.findById(userId);
        return {
            ...user._doc,
            _id: user.id,
            name: user.name,
            username: user.username,
            phone: user.phone,
            demographics: user.demographics

        };
    } catch (err) {
      throw err;
    }
  },
  deleteUser: async (args, req) => {
    // if (!req.isAuth) {
    //   throw new Error('Unauthenticated!');
    // }
    // console.log(JSON.stringify(args));
    try {
      const user = await User.findByIdAndRemove(args.userId);
      // const user = await User.findById(userId);
        return {
            ...user._doc,
            _id: user.id
        };
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
