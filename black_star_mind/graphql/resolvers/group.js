const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const DataLoader = require('dataloader');

const User = require('../../models/user');
const Group = require('../../models/group');
const Perk = require('../../models/perk');
const Content = require('../../models/content');
const Action = require('../../models/action');
const Search = require('../../models/search');

const { transformGroup } = require('./merge');
const { dateToString } = require('../../helpers/date');
const { pocketVariables } = require('../../helpers/pocketVars');

module.exports = {
  groups: async (args,req) => {
    if (!req.isAuth) {
      throw new Error('Unauthenticated!');
    }
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
    if (!req.isAuth) {
      throw new Error('Unauthenticated!');
    }
    console.log("args..." + JSON.stringify(args));
    try {
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
    if (!req.isAuth) {
      throw new Error('Unauthenticated!');
    }
    console.log("args..." + JSON.stringify(args));
    try {
      const group = await Group.findOne({name: args.name});
        return {
            ...group._doc,
            _id: group.id,
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
  getGroupType: async (args, req) => {
    if (!req.isAuth) {
      throw new Error('Unauthenticated!');
    }
    console.log("args..." + JSON.stringify(args));
    try {
      const groups = await Group.find({type: args.type});
      return groups.map(group => {
        return transformGroup(group);
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
  getGroupCreator: async (args, req) => {
    if (!req.isAuth) {
      throw new Error('Unauthenticated!');
    }
    console.log("args..." + JSON.stringify(args));
    try {
      const groups = await Group.find({'creator.username': args.userRefInput.username});
      return groups.map(group => {
        return transformGroup(group);
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
  getGroupUser: async (args, req) => {
    if (!req.isAuth) {
      throw new Error('Unauthenticated!');
    }
    console.log("args..." + JSON.stringify(args));
    try {
      const groups = await Group.find({'users.username': args.userRefInput.username});
      return groups.map(group => {
        return transformGroup(group);
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
  getGroupContentTitle: async (args, req) => {
    if (!req.isAuth) {
      throw new Error('Unauthenticated!');
    }
    console.log("args..." + JSON.stringify(args));
    try {
      const groups = await Group.find({'content.title': args.contentRefInput.title});
      return groups.map(group => {
        return transformGroup(group);
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
  getGroupPerk: async (args, req) => {
    if (!req.isAuth) {
      throw new Error('Unauthenticated!');
    }
    console.log("args..." + JSON.stringify(args));
    try {
      const groups = await Group.find({'perks.name': args.perkRefInput.name});
      return groups.map(group => {
        return transformGroup(group);
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
  getGroupUpvote: async (args, req) => {
    if (!req.isAuth) {
      throw new Error('Unauthenticated!');
    }
    try {
      const group = await Group.find({upvotes: {$eq:args.upvotes}})
        return {
            ...group._doc,
            _id: group.id,
            name: group.name,
            upvotes: group.upvotes
        };
    } catch (err) {
      throw err;
    }
  },
  getGroupDownvote: async (args, req) => {
    if (!req.isAuth) {
      throw new Error('Unauthenticated!');
    }
    try {
      const group = await Group.find({downvotes: {$eq:args.downvotes}})
        return {
            ...group._doc,
            _id: group.id,
            name: group.name,
            downvotes: group.downvotes
        };
    } catch (err) {
      throw err;
    }
  },
  getGroupTag: async (args, req) => {
    if (!req.isAuth) {
      throw new Error('Unauthenticated!');
    }
    console.log("args..." + JSON.stringify(args));
    try {
      const groups = await Group.find({tags: args.tag});
      return groups.map(group => {
        return transformGroup(group);
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
  updateGroup: async (args, req) => {
    if (!req.isAuth) {
      throw new Error('Unauthenticated!');
    }
    console.log("args..." + JSON.stringify(args));
    try {
      // Check request maker id matches user id
      const owner = await Group.findById({_id:args.groupId});
      console.log("owner..." + owner)
      if (owner.creator._id != pocketVariables.user._id ) {
        throw new Error('Not the creator! No edit permission');
      }
      const group = await Group.findOneAndUpdate({_id:args.groupId},{
        type: args.groupInput.type,
        name: args.groupInput.name,
        description: args.groupInput.description
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
    if (!req.isAuth) {
      throw new Error('Unauthenticated!');
    }
    console.log("args..." + JSON.stringify(args));
    try {
      const owner = await Group.findById({_id:args.groupId});
      console.log("owner..." + owner)
      if (owner.creator._id != pocketVariables.user._id ) {
        throw new Error('Not the creator! No edit permission');
      }
      const group = await Group.findOneAndUpdate({_id:args.groupId},{subtype:args.groupSubtypeInput},{new: true});
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
  updateGroupUser: async (args, req) => {
    if (!req.isAuth) {
      throw new Error('Unauthenticated!');
    }
    console.log("args..." + JSON.stringify(args));
    try {
      const owner = await Group.findById({_id:args.groupId});
      console.log("owner..." + owner)
      if (owner.creator._id != pocketVariables.user._id ) {
        throw new Error('Not the creator! No edit permission');
      }
      const group = await Group.findOneAndUpdate({_id:args.groupId},{$addToSet: {users:args.userRefInput}},{new: true});
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
  updateGroupData: async (args, req) => {
    if (!req.isAuth) {
      throw new Error('Unauthenticated!');
    }
    console.log("args..." + JSON.stringify(args));
    try {
      const owner = await Group.findById({_id:args.groupId});
      console.log("owner..." + owner)
      if (owner.creator._id != pocketVariables.user._id ) {
        throw new Error('Not the creator! No edit permission');
      }
      const group = await Group.findOneAndUpdate({_id:args.groupId},{$addToSet: {data:args.groupDataInput}},{new: true});
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
          data: group.data,
          actions: group.actions
        };
    } catch (err) {
      throw err;
    }
  },
  updateGroupContent: async (args, req) => {
    if (!req.isAuth) {
      throw new Error('Unauthenticated!');
    }
    console.log("args..." + JSON.stringify(args));
    try {
      const owner = await Group.findById({_id:args.groupId});
      console.log("owner..." + owner)
      if (owner.creator._id != pocketVariables.user._id ) {
        throw new Error('Not the creator! No edit permission');
      }
      const group = await Group.findOneAndUpdate({_id:args.groupId},{$addToSet: {content:args.contentRefInput}},{new: true});
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
          data: group.data,
          content: group.content,
          actions: group.actions
        };
    } catch (err) {
      throw err;
    }
  },
  updateGroupPerk: async (args, req) => {
    if (!req.isAuth) {
      throw new Error('Unauthenticated!');
    }
    console.log("args..." + JSON.stringify(args));
    try {
      const owner = await Group.findById({_id:args.groupId});
      console.log("owner..." + owner)
      if (owner.creator._id != pocketVariables.user._id ) {
        throw new Error('Not the creator! No edit permission');
      }
      const group = await Group.findOneAndUpdate({_id:args.groupId},{$addToSet: {perks:args.perkRefInput}},{new: true});
        return {
          ...group._doc,
          _id: group.id,
          action: group.action,
          subtype: group.subtype,
          name: group.name,
          perks: group.perks
        };
    } catch (err) {
      throw err;
    }
  },
  updateGroupUpvotes: async (args, req) => {
    if (!req.isAuth) {
      throw new Error('Unauthenticated!');
    }
    console.log("args..." + JSON.stringify(args));
    try {
      // const owner = await Group.findById({_id:args.groupId});
      // console.log("owner..." + owner)
      // if (owner.creator._id != pocketVariables.user._id ) {
      //   throw new Error('Not the creator! No edit permission');
      // }

      const group = await Group.findOneAndUpdate({_id:args.groupId},{$inc: {upvotes:1}},{new: true});
        return {
          ...group._doc,
          _id: group.id,
          name: group.name,
          upvotes: group.upvotes
        };
    } catch (err) {
      throw err;
    }
  },
  updateGroupDownvotes: async (args, req) => {
    if (!req.isAuth) {
      throw new Error('Unauthenticated!');
    }
    console.log("args..." + JSON.stringify(args));
    try {
      // const owner = await Group.findById({_id:args.groupId});
      // console.log("owner..." + owner)
      // if (owner.creator._id != pocketVariables.user._id ) {
      //   throw new Error('Not the creator! No edit permission');
      // }

      const group = await Group.findOneAndUpdate({_id:args.groupId},{$inc: {downvotes:1}},{new: true});
        return {
          ...group._doc,
          _id: group.id,
          name: group.name,
          downvotes: group.downvotes
        };
    } catch (err) {
      throw err;
    }
  },
  updateGroupTag: async (args, req) => {
    if (!req.isAuth) {
      throw new Error('Unauthenticated!');
    }
    console.log("args..." + JSON.stringify(args));
    try {
      const owner = await Group.findById({_id:args.groupId});
      console.log("owner..." + owner);
      if (owner.creator._id != pocketVariables.user._id ) {
        throw new Error('Not the creator! No edit permission');
      }
      const group = await Group.findOneAndUpdate({_id:args.groupId},{$addToSet: {tags:args.tags}},{new: true});
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
          actions: group. actions,
          tags: group. tags
        };
    } catch (err) {
      throw err;
    }
  },
  deleteGroup: async (args, req) => {
    if (!req.isAuth) {
      throw new Error('Unauthenticated!');
    }
    console.log("args..." + JSON.stringify(args));
    try {
      const owner = await Group.findById({_id:args.groupId});
      console.log("owner..." + owner)
      if (owner.creator._id != pocketVariables.user._id ) {
        throw new Error('Not the creator! No edit permission');
      }

      const group = await Group.findByIdAndRemove(args.groupId);
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
      // }
    } catch (err) {
      throw err;
    }
  },
  createGroup: async (args,req) => {
    if (!req.isAuth) {
      throw new Error('Unauthenticated!');
    }
    console.log("args..." + JSON.stringify(args));
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
        creator: args.groupInput.creator
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
        creator: result.creator,
        users: result.users
      };
    } catch (err) {
      throw err;
    }
  },
};
