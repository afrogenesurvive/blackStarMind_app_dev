const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const DataLoader = require('dataloader');

const User = require('../../models/user');
const Group = require('../../models/group');
const Perk = require('../../models/perk');
const Content = require('../../models/content');
const Action = require('../../models/action');
const Search = require('../../models/search');
const Chat = require('../../models/chat');

const { transformChat } = require('./merge');
const { dateToString } = require('../../helpers/date');
const { pocketVariables } = require('../../helpers/pocketVars');

module.exports = {
  perks: async (args,req) => {
    if (!req.isAuth) {
      throw new Error('Unauthenticated!');
    }
    console.log("args..." + JSON.stringify(args));
    try {
      const perks = await Perk.find()
      .populate('users')
      .populate('groups')
      .populate('content');

      return perks.map(perk => {
        return transformPerk(perk);
      });
    } catch (err) {
      throw err;
    }
  },
  deletePerk: async (args, req) => {
    if (!req.isAuth) {
      throw new Error('Unauthenticated!');
    }
    console.log("args..." + JSON.stringify(args));
    try {
      const perk = await Perk.findByIdAndRemove(args.perkId)
      .populate('users')
      .populate('groups')
      .populate('content');

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
    } catch (err) {
      throw err;
    }
  },
  createPerk: async (args,req) => {
    if (!req.isAuth) {
      throw new Error('Unauthenticated!');
    }
    console.log("args..." + JSON.stringify(args));
    try {
      const existingPerk = await Perk.findOne({ name: args.perkInput.name });
      if (existingPerk) {
        throw new Error('perk name exists already.');
      }
      const perk = new Perk({
        name: args.perkInput.name,
        description: args.perkInput.description,
        type: args.perkInput.type,
        subtype: args.perkInput.subtype,
        data: args.perkInput.data,
        users: args.perkInput.users,
        groups: args.perkInput.groups,
        content: args.perkInput.content,
        tags: args.perkInput.tags
      });

      const result = await perk.save();

      return {
        ...result._doc,
        _id: result.id,
        name: result.name,
        description: result.description,
        type: result.type,
        subtype: result.subtype,
        data: result.data,
        users: result.users,
        groups: result.groups,
        content: result.content,
        tags: result.tags
      };
    } catch (err) {
      throw err;
    }
  },
};
