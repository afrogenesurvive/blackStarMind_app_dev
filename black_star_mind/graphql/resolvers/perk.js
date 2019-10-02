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
  perks: async (req) => {
    // if (!req.isAuth) {
    //   throw new Error('Unauthenticated!');
    // }
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
    // if (!req.isAuth) {
    //   throw new Error('Unauthenticated!');
    // }
    try {
      const perk = await Perk.findById(args.perkId);
        return {
          ...perk._doc,
          _id: perk._id,
          name: perk.name,
          description: perk.description,
          type: perk.type,
          subtype: perk.subtype,
          data: perk.data,
          users: perk.users,
          groups: perk.groups,
          content: perk.content
        };
    } catch (err) {
      throw err;
    }
  },
  getPerkName: async (args, req) => {
    // if (!req.isAuth) {
    //   throw new Error('Unauthenticated!');
    // }
    try {
      const action = await Action.findOne({name: args.name});
        return {
          ...perk._doc,
          _id: perk._id,
          name: perk.name,
          description: perk.description,
          type: perk.type,
          subtype: perk.subtype,
          data: perk.data,
          users: perk.users,
          groups: perk.groups,
          content: perk.content
        };
    } catch (err) {
      throw err;
    }
  },
  getPerkType: async (args, req) => {
    // if (!req.isAuth) {
    //   throw new Error('Unauthenticated!');
    // }
    try {
      const action = await Perk.findOne({type: args.type});
        return {
          ...perk._doc,
          _id: perk._id,
          name: perk.name,
          description: perk.description,
          type: perk.type,
          subtype: perk.subtype,
          data: perk.data,
          users: perk.users,
          groups: perk.groups,
          content: perk.content
        };
    } catch (err) {
      throw err;
    }
  },
  // getPerkUser: async (args, req) => {
    // if (!req.isAuth) {
    //   throw new Error('Unauthenticated!');
    // }
    // try {
    //   const perks = await Perk.find();
    //   console.log(perks);
    // } catch (err) {
    //   throw(err)
    // };
    // try {
    //   const perk = await Perk.find({ 'users': { $elemMatch: {username: args.userRefInput.username } } });
      // const perk = await Perk.find({'users.username': {$lte: args.userRefInput.username}});
      // const perk = await Perk.find({'users.username': args.userRefInput.username});
  //     console.log(group);
  //       return {
  //          ...perk._doc,
              // _id: perk._id,
              // name: perk.name,
              // description: perk.description,
              // type: perk.type,
              // subtype: perk.subtype,
              // data: perk.data,
              // users: perk.users,
              // groups: perk.groups,
              // content: perk.content
  //       };
  //   } catch (err) {
  //     throw err;
  //   }
  // },
  updatePerk: async (args, req) => {
    // if (!req.isAuth) {
    //   throw new Error('Unauthenticated!');
    // }
    console.log(JSON.stringify(args));
    try {
      const content = await Perk.findOneAndUpdate({_id:args.perkId},{
        // {
        type: args.actionInput.type,
        target: args.actionInput.target,
        creator: args.actionInput.creator,
        description: args.actionInput.description,
      // }
      },{new: true});
        return {
          ...perk._doc,
          _id: perk._id,
          name: perk.name,
          description: perk.description,
          type: perk.type,
          subtype: perk.subtype,
          data: perk.data,
          users: perk.users,
          groups: perk.groups,
          content: perk.content
        };
    } catch (err) {
      throw err;
    }
  },
  updatePerkSubtype: async (args, req) => {
    // if (!req.isAuth) {
    //   throw new Error('Unauthenticated!');
    // }
    console.log(JSON.stringify(args));
    try {
      const perk = await Perk.findOneAndUpdate({_id:args.perkId},{subtype: args.perkSubtypeInput},{new: true});
        return {
          ...perk._doc,
          _id: perk._id,
          name: perk.name,
          description: perk.description,
          type: perk.type,
          subtype: perk.subtype,
          data: perk.data,
          users: perk.users,
          groups: perk.groups,
          content: perk.content
        };
    } catch (err) {
      throw err;
    }
  },
  updatePerkUser: async (args, req) => {
    // if (!req.isAuth) {
    //   throw new Error('Unauthenticated!');
    // }
    console.log(JSON.stringify(args));
    try {
      const content = await Perk.findOneAndUpdate({_id:args.perkId},{$push: {users:args.userRefInput}},{new: true});
        return {
          ...perk._doc,
          _id: perk._id,
          name: perk.name,
          description: perk.description,
          type: perk.type,
          subtype: perk.subtype,
          data: perk.data,
          users: perk.users,
          groups: perk.groups,
          content: perk.content
        };
    } catch (err) {
      throw err;
    }
  },
  updatePerkData: async (args, req) => {
    // if (!req.isAuth) {
    //   throw new Error('Unauthenticated!');
    // }
    console.log(JSON.stringify(args));
    try {
      const content = await Action.findOneAndUpdate({_id:args.perkId},{$push: {data:args.perkDataInput}},{new: true});
        return {
          ...perk._doc,
          _id: perk._id,
          name: perk.name,
          description: perk.description,
          type: perk.type,
          subtype: perk.subtype,
          data: perk.data,
          users: perk.users,
          groups: perk.groups,
          content: perk.content
        };
    } catch (err) {
      throw err;
    }
  },
  updatePerkContent: async (args, req) => {
    // if (!req.isAuth) {
    //   throw new Error('Unauthenticated!');
    // }
    console.log(JSON.stringify(args));
    try {
      const group = await Perk.findOneAndUpdate({_id:args.perkId},{$push: {content:args.contentRefInput}},{new: true});
        return {
          ...perk._doc,
          _id: perk._id,
          name: perk.name,
          description: perk.description,
          type: perk.type,
          subtype: perk.subtype,
          data: perk.data,
          users: perk.users,
          groups: perk.groups,
          content: perk.content
        };
    } catch (err) {
      throw err;
    }
  },
  updatePerkTag: async (args, req) => {
    // if (!req.isAuth) {
    //   throw new Error('Unauthenticated!');
    // }
    console.log(JSON.stringify(args));
    try {
      const content = await Perk.findOneAndUpdate({_id:args.perkId},{$push: {tags:args.tags}},{new: true});
        return {
          ...perk._doc,
          _id: perk._id,
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
    // if (!req.isAuth) {
    //   throw new Error('Unauthenticated!');
    // }
    // console.log(JSON.stringify(args));
    try {
      const perk = await Perk.findByIdAndRemove(args.perkId);
        return {
          ...perk._doc,
          _id: perk.id
        };
    } catch (err) {
      throw err;
    }
  },
  createPerk: async (args) => {
    // if (!req.isAuth) {
    //   throw new Error('Unauthenticated!');
    // }
    console.log(JSON.stringify(args));
    try {
      // const existingContent = await Action.findOne({ title: args.actionInput.title });
      // if (existingContent) {
      //   throw new Error('Title exists already.');
      // }
      const perk = new Perk({
        name: args.perkInput.name,
        description: args.perkInput.description,
        type: args.perkInput.type
      });

      const result = await perk.save();

      return {
        ...perk._doc,
        _id: perk._id,
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
      // pocketVariables.key01 = "contentId";
      // pocketVariables.value01 = result.id;
      // return pocketVariables;
      // console.log("pocket vars:  " + pocketVariables);
    } catch (err) {
      throw err;
    }
  },
};
