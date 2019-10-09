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

const { transformPerk } = require('./merge');
const { dateToString } = require('../../helpers/date');
const { pocketVariables } = require('../../helpers/pocketVars');

module.exports = {
  perks: async (args,req) => {
    if (!req.isAuth) {
      throw new Error('Unauthenticated!');
    }
    try {
      const perks = await Perk.find();
      return perks.map(perk => {
        return transformPerk(perk);
      });
    } catch (err) {
      throw err;
    }
  },
  getPerkId: async (args, req) => {
    if (!req.isAuth) {
      throw new Error('Unauthenticated!');
    }
    try {
      const perk = await Perk.findById(args.perkId);
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
  getPerkName: async (args, req) => {
    if (!req.isAuth) {
      throw new Error('Unauthenticated!');
    }
    try {
      const perk = await Perk.findOne({name: args.name});
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
  getPerkType: async (args, req) => {
    if (!req.isAuth) {
      throw new Error('Unauthenticated!');
    }
    try {
      const perks = await Perk.find({type: args.type});
      return perks.map(perk => {
        return transformPerk(perk);
      });
        // {
        // ...perk._doc,
        // _id: perk._id,
        // name: perk.name,
        // description: perk.description,
        // type: perk.type,
        // subtype: perk.subtype,
        // data: perk.data,
        // users: perk.users,
        // groups: perk.groups,
        // content: perk.content,
        // tags: perk.tags
        // };
    } catch (err) {
      throw err;
    }
  },
  getPerkUser: async (args, req) => {
    if (!req.isAuth) {
      throw new Error('Unauthenticated!');
    }
    try {
      const perks = await Perk.find({'users.username': args.userRefInput.username});
      return perks.map(perk => {
        return transformPerk(perk);
      });
      // {
      // ...perk._doc,
      // _id: perk._id,
      // name: perk.name,
      // description: perk.description,
      // type: perk.type,
      // subtype: perk.subtype,
      // data: perk.data,
      // users: perk.users,
      // groups: perk.groups,
      // content: perk.content,
      // tags: perk.tags
      // };
    } catch (err) {
      throw err;
    }
  },
  getPerkGroup: async (args, req) => {
    if (!req.isAuth) {
      throw new Error('Unauthenticated!');
    }
    try {
      const perks = await Perk.find({groups: args.groupRefInput});
      return perks.map(perk => {
        return transformPerk(perk);
      });
      // {
      // ...perk._doc,
      // _id: perk._id,
      // name: perk.name,
      // description: perk.description,
      // type: perk.type,
      // subtype: perk.subtype,
      // data: perk.data,
      // users: perk.users,
      // groups: perk.groups,
      // content: perk.content,
      // tags: perk.tags
      // };
    } catch (err) {
      throw err;
    }
  },
  getPerkTag: async (args, req) => {
    if (!req.isAuth) {
      throw new Error('Unauthenticated!');
    }
    try {
      const perks = await Perk.find({tags: args.tag});
      return perks.map(perk => {
        return transformPerk(perk);
      });
      // {
      // ...perk._doc,
      // _id: perk._id,
      // name: perk.name,
      // description: perk.description,
      // type: perk.type,
      // subtype: perk.subtype,
      // data: perk.data,
      // users: perk.users,
      // groups: perk.groups,
      // content: perk.content,
      // tags: perk.tags
      // };
    } catch (err) {
      throw err;
    }
  },
  updatePerk: async (args, req) => {
    if (!req.isAuth) {
      throw new Error('Unauthenticated!');
    }
    try {
      const perk = await Perk.findOneAndUpdate({_id:args.perkId},{
        // {
        name: args.perkInput.name,
        description: args.perkInput.description,
        type: args.perkInput.type,
        subtype: args.perkInput.subtype,
        data: args.perkInput.data,
        users: args.perkInput.users,
        groups: args.perkInput.groups,
        content: args.perkInput.content,
        tags: args.perkInput.tags
      // }
      },{new: true});
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
  updatePerkSubtype: async (args, req) => {
    if (!req.isAuth) {
      throw new Error('Unauthenticated!');
    }
    try {
      const perk = await Perk.findOneAndUpdate({_id:args.perkId},{subtype:args.perkSubtypeInput},{new: true});
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
  updatePerkUser: async (args, req) => {
    if (!req.isAuth) {
      throw new Error('Unauthenticated!');
    }
    try {
      const perk= await Perk.findOneAndUpdate({_id:args.perkId},{$push: {users:args.userRefInput}},{new: true});
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
  updatePerkData: async (args, req) => {
    if (!req.isAuth) {
      throw new Error('Unauthenticated!');
    }
    try {
      const perk = await Perk.findOneAndUpdate({_id:args.perkId},{$push: {data:args.perkDataInput}},{new: true});
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
  updatePerkContent: async (args, req) => {
    if (!req.isAuth) {
      throw new Error('Unauthenticated!');
    }
    try {
      const perk = await Perk.findOneAndUpdate({_id:args.perkId},{$push: {content:args.contentRefInput}},{new: true});
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
  updatePerkGroup: async (args, req) => {
    if (!req.isAuth) {
      throw new Error('Unauthenticated!');
    }
    try {
      const perk = await Perk.findOneAndUpdate({_id:args.perkId},{$push: {groups:args.groupRefInput}},{new: true});
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
  updatePerkTag: async (args, req) => {
    if (!req.isAuth) {
      throw new Error('Unauthenticated!');
    }
    try {
      const perk = await Perk.findOneAndUpdate({_id:args.perkId},{$push: {tags:args.tags}},{new: true});
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
  deletePerk: async (args, req) => {
    if (!req.isAuth) {
      throw new Error('Unauthenticated!');
    }
    try {
      const perk = await Perk.findByIdAndRemove(args.perkId);
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
