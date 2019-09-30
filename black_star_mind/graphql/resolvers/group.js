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

const { transformGroup } = require('./merge');
const { dateToString } = require('../../helpers/date');

module.exports = {
  groups: async (req) => {
    // if (!req.isAuth) {
    //   throw new Error('Unauthenticated!');
    // }
    try {
      const groups = await Group.find();
      return groups.map(group => {
        return transformGroup(group);
      });
    } catch (err) {
      throw err;
    }
  },
  getGroupId: async (args, req) => {
    // if (!req.isAuth) {
    //   throw new Error('Unauthenticated!');
    // }
    // console.log(args.username);
    try {
      // const user = await User.findOne(args.username);
      const group = await Group.findById(args.groupId);
        return {
            ...group._doc,
            _id: group.id,
            createdAt: group.createdAt,
            updatedAt: group.updatedAt,
            type: group.type,
            subtype: group.subtype,
            name: group.name,
            description: group.description,
            users: group.users
        };
    } catch (err) {
      throw err;
    }
  },
  getGroupName: async (args, req) => {
    // if (!req.isAuth) {
    //   throw new Error('Unauthenticated!');
    // }
    try {
      const group = await Group.findOne({name: args.name});
        return {
            ...group._doc,
            _id: group.id,
            createdAt: group.createdAt,
            updatedAt: group.updatedAt,
            type: group.type,
            subtype: group.subtype,
            name: group.name,
            description: group.description,
            users: group.users
        };
    } catch (err) {
      throw err;
    }
  },
  getGroupUserId: async (args, req) => {
    // if (!req.isAuth) {
    //   throw new Error('Unauthenticated!');
    // }
    try {
      const content = await Content.find({"users.username": {$lte: args.userRefInput.username}});
        return {
            ...content._doc,
            _id: content.id,
            createdAt: group.createdAt,
            updatedAt: group.updatedAt,
            type: group.type,
            subtype: group.subtype,
            name: group.name,
            description: group.description,
            users: group.users
        };
    } catch (err) {
      throw err;
    }
  },
  updateContent: async (args, req) => {
    // if (!req.isAuth) {
    //   throw new Error('Unauthenticated!');
    // }
    console.log(JSON.stringify(args));
    try {
      const content = await Content.findOneAndUpdate({_id:args._id},{
        // {
        createdAt: args.contentInput.createdAt,
        updatedAt: args.contentInput.updatedAt,
        title: args.contentInput.title,
        domain: args.contentInput.domain,
        category: args.contentInput.category,
        creator: args.contentInput.creator
      // }
      },{new: true});
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
    } catch (err) {
      throw err;
    }
  },
  updateContentData: async (args, req) => {
    // if (!req.isAuth) {
    //   throw new Error('Unauthenticated!');
    // }
    console.log(JSON.stringify(args));
    try {
      const content = await Content.findOneAndUpdate({_id:args._id},{$push: {data:args.contentDataInput}},{new: true});
      // const user = await User.findById(userId);
        return {
          ...args.contentDataInput._doc,
          _id: args.contentDataInput.id,
          createdAt: args.contentDataInput.createdAt,
          updatedAt: args.contentDataInput.updatedAt,
          title: args.contentDataInput.title,
          domain: args.contentDataInput.domain,
          category: args.contentDataInput.category,
          creator: args.contentDataInput.creator
        };
    } catch (err) {
      throw err;
    }
  },
  deleteContent: async (args, req) => {
    // if (!req.isAuth) {
    //   throw new Error('Unauthenticated!');
    // }
    // console.log(JSON.stringify(args));
    try {
      const content = await Content.findByIdAndRemove(args._id);
      // const user = await User.findById(userId);
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
    } catch (err) {
      throw err;
    }
  },
  createContent: async args => {
    // if (!req.isAuth) {
    //   throw new Error('Unauthenticated!');
    // }
    // console.log(JSON.stringify(args));
    try {
      const existingContent = await Content.findOne({ title: args.contentInput.title });
      if (existingContent) {
        throw new Error('Title exists already.');
      }

      const content = new Content({
        createdAt: args.contentDataInput.createdAt,
        updatedAt: args.contentDataInput.updatedAt,
        title: args.contentDataInput.title,
        domain: args.contentDataInput.domain,
        category: args.contentDataInput.category,
        creator: args.contentDataInput.creator
      });

      const result = await content.save();

      return {
        ...result._doc,
        _id: result.id,
        createdAt: result.createdAt,
        updatedAt: result.updatedAt,
        title: result.title,
        domain: result.domain,
        category: result.category,
        creator: result.creator
      };
    } catch (err) {
      throw err;
    }
  },
};
