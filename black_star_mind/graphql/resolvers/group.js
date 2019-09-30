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
const { pocketVariables } = require('../../helpers/pocketVars');

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
            users: group.users,
            actions: group.actions
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
            users: group.users,
            actions: group.actions
        };
    } catch (err) {
      throw err;
    }
  },
  getGroupCreator: async (args, req) => {
    // if (!req.isAuth) {
    //   throw new Error('Unauthenticated!');
    // }
    try {
      const group = await Group.find({creator: args.groupCreator});
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
    } catch (err) {
      throw err;
    }
  },
  getGroupUsername: async (args, req) => {
    // if (!req.isAuth) {
    //   throw new Error('Unauthenticated!');
    // }
    try {
      const group = await Group.find({ 'users': { $elemMatch: {username: args.userRefInput.username } } });
      // const group = await Group.find({'users.username': {$lte: args.userRefInput.username}});
      // const group = await Group.find({'users.username': args.userRefInput.username});
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
    } catch (err) {
      throw err;
    }
  },
  updateGroup: async (args, req) => {
    // if (!req.isAuth) {
    //   throw new Error('Unauthenticated!');
    // }
    console.log(JSON.stringify(args));
    try {
      const group = await Group.findOneAndUpdate({_id:args.groupId},{
        // {
        type: args.groupInput.type,
        subtype: args.groupSubtypeInput,
        name: args.groupInput.name,
        description: args.groupInput.description,
        users: args.userRefInput.users
      // }
      },{new: true});
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
    } catch (err) {
      throw err;
    }
  },
  updateGroupSubtype: async (args, req) => {
    // if (!req.isAuth) {
    //   throw new Error('Unauthenticated!');
    // }
    console.log(JSON.stringify(args));
    try {
      const group = await Group.findOneAndUpdate({_id:args.groupId},{subtype:args.groupSubtypeInput},{new: true});
      // const user = await User.findById(userId);
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
    } catch (err) {
      throw err;
    }
  },
  updateGroupUsers: async (args, req) => {
    // if (!req.isAuth) {
    //   throw new Error('Unauthenticated!');
    // }
    console.log(JSON.stringify(args));
    try {
      const group = await Group.findOneAndUpdate({_id:args.groupId},{$push: {users:args.userRefInput}},{new: true});
      // const user = await User.findById(userId);
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
    } catch (err) {
      throw err;
    }
  },
  updateGroupContent: async (args, req) => {
    // if (!req.isAuth) {
    //   throw new Error('Unauthenticated!');
    // }
    console.log(JSON.stringify(args));
    try {
      const group = await Group.findOneAndUpdate({_id:args.groupId},{$push: {content:args.contentRefInput}},{new: true});
      // const user = await User.findById(userId);
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
          content: group.content,
          actions: group.actions
        };
    } catch (err) {
      throw err;
    }
  },
  updateGroupAction: async (args, req) => {
    // if (!req.isAuth) {
    //   throw new Error('Unauthenticated!');
    // }
    console.log(JSON.stringify(args));
    try {
      const group = await Group.findOneAndUpdate({_id:args.groupId},{$push: {actions:args.actionRefInput}},{new: true});
      // const user = await User.findById(userId);
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
          content: group.content,
          actions: group. actions
        };
    } catch (err) {
      throw err;
    }
  },
  deleteGroup: async (args, req) => {
    // if (!req.isAuth) {
    //   throw new Error('Unauthenticated!');
    // }
    // console.log(JSON.stringify(args));
    try {
      const group = await Group.findByIdAndRemove(args.groupId);
      // const user = await User.findById(userId);
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
    } catch (err) {
      throw err;
    }
  },
  createGroup: async (args) => {
    // if (!req.isAuth) {
    //   throw new Error('Unauthenticated!');
    // }
    console.log(JSON.stringify(args.groupInput.users));
    try {
      const existingGroup = await Group.findOne({ name: args.groupInput.name });
      if (existingGroup) {
        throw new Error('Group name already taken.');
      }

      const group = new Group({
        type: args.groupInput.type,
        subtype: args.groupInput.subtype,
        name: args.groupInput.name,
        description: args.groupInput.description,
        users: args.groupInput.users
        // users: args.userRefInput
      });

      const result = await group.save();

      return {
        ...result._doc,
        _id: result.id,
        createdAt: result.createdAt,
        updatedAt: result.updatedAt,
        type: result.type,
        subtype: result.subtype,
        name: result.name,
        description: result.description,
        users: result.users
      };
    } catch (err) {
      throw err;
    }
  },
};
