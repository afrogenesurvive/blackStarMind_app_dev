const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const DataLoader = require('dataloader');

const ObjectId = require('mongodb').ObjectID;

const User = require('../../models/user');
const Group = require('../../models/group');
const Perk = require('../../models/perk');
const Content = require('../../models/content');
const Action = require('../../models/action');
const Search = require('../../models/search');
const Chat = require('../../models/chat');

const { transformGroup } = require('./merge');
const { dateToString } = require('../../helpers/date');

module.exports = {
  groups: async (args,req) => {
    if (!req.isAuth) {
      throw new Error('Unauthenticated!');
    }
    try {
      const groups = await Group.find().populate('creator').populate('users').populate('content').populate('perks');

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
      const group = await Group.findById(args.groupId).populate('creator').populate('users').populate('content').populate('perks');
        return {
            ...group._doc,
            _id: group.id,
            type: group.type,
            subtype: group.subtype,
            name: group.name,
            creator: group.creator,
            description: group.description,
            users: group.users
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
      const group = await Group.findOne({name: args.name}).populate('creator').populate('users').populate('content').populate('perks');
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
      const groups = await Group.find({type: args.type}).populate('creator').populate('users').populate('content').populate('perks');
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
      const creatorObj = await User.findById(args.creatorId)
      console.log("creator object... " + creatorObj);

      const groups = await Group.find({'creator': creatorObj}).populate('creator').populate('users').populate('content').populate('perks');
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

      const groupUserObj = await User.findById(args.groupUserId)
      console.log("group user object... " + groupUserObj);

      const groups = await Group.find({'users': groupUserObj}).populate('creator').populate('users').populate('content').populate('perks');
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
  getGroupContent: async (args, req) => {
    if (!req.isAuth) {
      throw new Error('Unauthenticated!');
    }
    console.log("args..." + JSON.stringify(args));
    try {
      const groupContentObj = await Content.findById({_id:args.contentId})
      console.log("group content object... " + groupContentObj);

      const groups = await Group.find({'content': groupContentObj }).populate('creator').populate('users').populate('content').populate('perks');
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
      const groupPerkObj = await Perk.findById({_id:args.perkId})
      console.log("group content object... " + groupPerkObj);

      const groups = await Group.find({'perks': groupPerkObj}).populate('creator').populate('users').populate('content').populate('perks');
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
  getGroupUpvotes: async (args, req) => {
    if (!req.isAuth) {
      throw new Error('Unauthenticated!');
    }
    console.log("args..." + JSON.stringify(args));
    try {
      const groups = await Group.find({'upvotes.count':args.upvotes}).populate('creator').populate('users').populate('content').populate('perks');
      return groups.map(group => {
        return transformGroup(group);
      });
        // return {
        //     ...group._doc,
        //     _id: group.id,
        //     name: group.name,
        //     creator: group.creator,
        //     upvotes: group.upvotes,
        //     downvotes: group.downvotes,
        //     tags: group.tags
        // };
    } catch (err) {
      throw err;
    }
  },
  getGroupDownvotes: async (args, req) => {
    if (!req.isAuth) {
      throw new Error('Unauthenticated!');
    }
    console.log("args..." + JSON.stringify(args));
    try {
      const groups = await Group.find({'downvotes.count':args.downvotes}).populate('creator').populate('users').populate('content').populate('perks');
      return groups.map(group => {
        return transformGroup(group);
      });
        // return {
        //     ...group._doc,
        //     _id: group.id,
        //     name: group.name,
        //     creator: group.creator,
        //     upvotes: group.upvotes,
        //     downvotes: group.downvotes,
        //     tags: group.tags
        // };
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
      const groups = await Group.find({tags: args.tag}).populate('creator').populate('users').populate('content').populate('perks');
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
      const owner = await Group.findById({_id:args.groupId});
      console.log("group object... " + owner );
      console.log("request user... " + req.userId);
      console.log("owner... " + owner.creator)
      if (owner.creator._id != req.userId ) {
        throw new Error('Not the creator! No edit permission');
      }
      const group = await Group.findOneAndUpdate({_id:args.groupId},{
        type: args.groupInput.type,
        name: args.groupInput.name,
        description: args.groupInput.description
      },{new: true}).populate('creator').populate('users').populate('content').populate('perks');
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
  updateGroupSubtype: async (args, req) => {
    if (!req.isAuth) {
      throw new Error('Unauthenticated!');
    }
    console.log("args..." + JSON.stringify(args));
    try {
      const owner = await Group.findById({_id:args.groupId});
      console.log("group object... " + owner );
      console.log("request user... " + req.userId);
      console.log("owner... " + owner.creator)
      if (owner.creator._id != req.userId ) {
        throw new Error('Not the creator! No edit permission');
      }
      const group = await Group.findOneAndUpdate({_id:args.groupId},{subtype:args.groupSubtypeInput},{new: true}).populate('creator').populate('users').populate('content').populate('perks');
        return {
          ...group._doc,
          _id: group.id,
          createdAt: group.createdAt,
          updatedAt: group.updatedAt,
          creator: group.creator,
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
  updateGroupUser: async (args, req) => {
    if (!req.isAuth) {
      throw new Error('Unauthenticated!');
    }
    console.log("args..." + JSON.stringify(args));
    try {
      const owner = await Group.findById({_id:args.groupId});
      console.log("group object... " + owner );
      console.log("request user... " + req.userId);
      console.log("owner... " + owner.creator)
      if (owner.creator != req.userId ) {
        throw new Error('Not the creator! No edit permission');
      }

      const groupUser = await User.findById({_id:args.groupUserId});
      const groupUserId = groupUser.id
      console.log("groupUser... " + groupUser.username);
      console.log("groupUserId... " + groupUserId);

      const group = await Group.findOneAndUpdate({_id:args.groupId},{$addToSet: {users:groupUser}},{new: true}).populate('creator').populate('users').populate('content').populate('perks')

        return {
          ...group._doc,
          _id: group.id,
          createdAt: group.createdAt,
          updatedAt: group.updatedAt,
          type: group.type,
          subtype: group.subtype,
          name: group.name,
          creator: group.creator,
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
      console.log("group object... " + owner );
      console.log("owner... " + owner.creator)
      if (owner.creator._id != args.userId ) {
        throw new Error('Not the creator! No edit permission');
      }

      const group = await Group.findOneAndUpdate({_id:args.groupId},{$addToSet: {data:args.groupDataInput}},{new: true}).populate('creator').populate('users').populate('content').populate('perks');
        return {
          ...group._doc,
          _id: group.id,
          createdAt: group.createdAt,
          updatedAt: group.updatedAt,
          type: group.type,
          subtype: group.subtype,
          name: group.name,
          creator: group.creator,
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
      console.log("group object... " + owner );
      console.log("owner... " + owner.creator)
      if (owner.creator != req.userId ) {
        throw new Error('Not the creator! No edit permission');
      }

      const userContent = await Content.findById({_id:args.contentId});
      const userContentId = userContent.id
      console.log("userContent... " + userContent.username);
      console.log("userContentId... " + userContentId);

      const group = await Group.findOneAndUpdate({_id:args.groupId},{$addToSet: {content:userContent}},{new: true})
      .populate('users')
      .populate('creator')
      .populate('content')
      .populate('perks')

        return {
          ...group._doc,
          _id: group.id,
          createdAt: group.createdAt,
          updatedAt: group.updatedAt,
          type: group.type,
          subtype: group.subtype,
          creator: group.creator,
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
      console.log("group object... " + owner );
      console.log("request user... " + req.userId);
      console.log("owner... " + owner.creator)
      if (owner.creator._id != req.userId ) {
        throw new Error('Not the creator! No edit permission');
      }

      const userPerk = await Perk.findById({_id:args.perkId});
      const userPerkId = userPerk.id
      console.log("userPerk... " + userPerk.name);
      console.log("userPerkId... " + userPerkId);

      const group = await Group.findOneAndUpdate({_id:args.groupId},{$addToSet: {perks:userPerk}},{new: true})
      .populate('users')
      .populate('creator')
      .populate('content')
      .populate('perks')

        return {
          ...group._doc,
          _id: group.id,
          action: group.action,
          type: group.type,
          subtype: group.subtype,
          name: group.name,
          creator: group.creator,
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
      // if (owner.creator._id != req.userId ) {
      //   throw new Error('Not the creator! No edit permission');
      // }

      const voteGroup = await Group.findById({_id:args.groupId})
      console.log("vote group..." + voteGroup.upvotes.users);
      if (voteGroup.upvotes.users.includes(req.userId)) {
        throw new Error('Already Voted!');
      }
      const group = await Group.findOneAndUpdate({_id:args.groupId},{$inc: {'upvotes.count':1},$addToSet:{'upvotes.users':req.userId}},{new: true})
      .populate('users')
      .populate('creator')
      .populate('content')
      .populate('perks');

        return {
          ...group._doc,
          _id: group.id,
          type: group.type,
          subtype: group.subtype,
          name: group.name,
          creator: group.creator,
          downvotes: group.downvotes
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
      // if (owner.creator._id != req.userId ) {
      //   throw new Error('Not the creator! No edit permission');
      // }

      const voteGroup = await Group.findById({_id:args.groupId})
      console.log("vote group..." + voteGroup.downvotes.users);
      if (voteGroup.downvotes.users.includes(req.userId)) {
        throw new Error('Already Voted!');
      }
      const group = await Group.findOneAndUpdate({_id:args.groupId},{$inc: {'downvotes.count':1},$addToSet:{'downvotes.users':req.userId}},{new: true})
      .populate('users')
      .populate('creator')
      .populate('content')
      .populate('perks');

        return {
          ...group._doc,
          _id: group.id,
          type: group.type,
          subtype: group.subtype,
          name: group.name,
          creator: group.creator,
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
      console.log("group object... " + owner );
      console.log("request user... " + args.userId);
      console.log("owner... " + owner.creator)
      if (owner.creator._id != args.userId ) {
        throw new Error('Not the creator! No edit permission');
      }

      const group = await Group.findOneAndUpdate({_id:args.groupId},{$addToSet: {tags:args.tags}},{new: true}).populate('creator').populate('users').populate('content').populate('perks');
        return {
          ...group._doc,
          _id: group.id,
          createdAt: group.createdAt,
          updatedAt: group.updatedAt,
          type: group.type,
          subtype: group.subtype,
          creator: group.creator,
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
      console.log("group object... " + owner );
      console.log("request user... " + args.userId);
      console.log("owner... " + owner.creator)
      if (owner.creator._id != args.userId ) {
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
          creator: group.creator,
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
      const existingGroup = await Group.findOne({name: args.groupInput.name});
      if (existingGroup) {
        throw new Error('Group name already taken.');
      }

      const creator = await User.findById({_id:args.userId});
      const creatorId = creator.id
      console.log("creator... " + creator);
      console.log("creatorId... " + creatorId);

      const group = new Group({
        type: args.groupInput.type,
        subtype: args.groupInput.subtype,
        name: args.groupInput.name,
        description: args.groupInput.description,
        creator: creator
      });

      const result = await group.save();

      return {
        ...result._doc,
        _id: result.id,
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
