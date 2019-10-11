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

const { transformContent } = require('./merge');
const { dateToString } = require('../../helpers/date');
const { pocketVariables } = require('../../helpers/pocketVars');

module.exports = {
  contents: async (args,req) => {
    if (!req.isAuth) {
      throw new Error('Unauthenticated!');
    }
    try {
      const contents = await Content.find();
      return contents.map(content => {
        return transformContent(content);
      });
    } catch (err) {
      throw err;
    }
  },
  getContentId: async (args, req) => {
    if (!req.isAuth) {
      throw new Error('Unauthenticated!');
    }
    try {
      const content = await Content.findById(args.contentId);
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
  getContentType: async (args, req) => {
    if (!req.isAuth) {
      throw new Error('Unauthenticated!');
    }
    console.log("args..." + JSON.stringify(args));
    try {
      const contents = await Content.find({type: args.type});
      return contents.map(content => {
        return transformContent(content);
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
  getContentTitle: async (args, req) => {
    if (!req.isAuth) {
      throw new Error('Unauthenticated!');
    }
    try {
      const content = await Content.findOne({title: args.title});
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
  getContentDomain: async (args, req) => {
    if (!req.isAuth) {
      throw new Error('Unauthenticated!');
    }
    try {
      const contents = await Content.find({domain: args.domain});
      return contents.map(content => {
        return transformContent(content);
      });
        // {
        //     ...content._doc,
        //     _id: content.id,
        //     title: content.title,
        //     domain: content.domain,
        //     category: content.category,
        //     creator: content.creator
        // };
    } catch (err) {
      throw err;
    }
  },
  getContentCategory: async (args, req) => {
    if (!req.isAuth) {
      throw new Error('Unauthenticated!');
    }
    try {
      const contents = await Content.find({category: args.category});
      return contents.map(content => {
        return transformContent(content);
      });
        // {
        //     ...content._doc,
        //     _id: content.id,
        //     title: content.title,
        //     domain: content.domain,
        //     category: content.category,
        //     creator: content.creator
        // };
    } catch (err) {
      throw err;
    }
  },
  getContentCreator: async (args, req) => {
    if (!req.isAuth) {
      throw new Error('Unauthenticated!');
    }
    try {
      const contents = await Content.find({'creator.username': args.userRefInput.username});
      return contents.map(content => {
        return transformContent(content);
      });
        // {
        //     ...content._doc,
        //     _id: content.id,
        //     title: content.title,
        //     domain: content.domain,
        //     category: content.category,
        //     creator: content.creator
        // };
    } catch (err) {
      throw err;
    }
  },
  getContentUser: async (args, req) => {
    if (!req.isAuth) {
      throw new Error('Unauthenticated!');
    }
    try {
      const contents = await Content.find({'users.username': args.userRefInput.username});
      return contents.map(content => {
        return transformContent(content);
      });
        // {
        //     ...content._doc,
        //     _id: content.id,
        //     title: content.title,
        //     domain: content.domain,
        //     category: content.category,
        //     creator: content.creator
        // };
    } catch (err) {
      throw err;
    }
  },
  getContentPerk: async (args, req) => {
    if (!req.isAuth) {
      throw new Error('Unauthenticated!');
    }
    try {
      const contents = await Content.find({'perks.name': args.perkRefInput.name});
      return contents.map(content => {
        return transformContent(content);
      });
        // {
        //     ...content._doc,
        //     _id: content.id,
        //     title: content.title,
        //     domain: content.domain,
        //     category: content.category,
        //     creator: content.creator
        // };
    } catch (err) {
      throw err;
    }
  },
  getContentCommentCreator: async (args, req) => {
    if (!req.isAuth) {
      throw new Error('Unauthenticated!');
    }
    try {
      const contents = await Content.find({'comments.user.username': args.commentInput.user.username});
      return contents.map(content => {
        return transformContent(content);
      });
        // {
        //     ...content._doc,
        //     _id: content.id,
        //     title: content.title,
        //     domain: content.domain,
        //     category: content.category,
        //     creator: content.creator
        // };
    } catch (err) {
      throw err;
    }
  },
  getContentComment: async (args, req) => {
    if (!req.isAuth) {
      throw new Error('Unauthenticated!');
    }
    try {
      const contents = await Content.find({'comments.comment': args.commentInput.comment});
      return contents.map(content => {
        return transformContent(content);
      });
        // {
        //     ...content._doc,
        //     _id: content.id,
        //     title: content.title,
        //     domain: content.domain,
        //     category: content.category,
        //     creator: content.creator
        // };
    } catch (err) {
      throw err;
    }
  },
  getContentUpvote: async (args, req) => {
    if (!req.isAuth) {
      throw new Error('Unauthenticated!');
    }
    try {
      const content = await Content.find({upvotes: {$eq:args.upvotes}})
        return {
            ...content._doc,
            _id: content.id,
            title: content.title,
            upvotes: content.upvotes
        };
    } catch (err) {
      throw err;
    }
  },
  getContentDownvote: async (args, req) => {
    if (!req.isAuth) {
      throw new Error('Unauthenticated!');
    }
    try {
      const content = await Content.find({downvotes: {$eq:args.downvotes}})
        return {
            ...content._doc,
            _id: content.id,
            title: content.title,
            downvotes: content.downvotes
        };
    } catch (err) {
      throw err;
    }
  },
  getContentTag: async (args, req) => {
    if (!req.isAuth) {
      throw new Error('Unauthenticated!');
    }
    try {
      const contents = await Content.find({tags: args.tag});
      return contents.map(content => {
        return transformContent(content);
      });
      // {
      //     ...content._doc,
      //     _id: content.id,
      //     title: content.title,
      //     domain: content.domain,
      //     category: content.category,
      //     creator: content.creator
      // };
    } catch (err) {
      throw err;
    }
  },
  updateContent: async (args, req) => {
    if (!req.isAuth) {
      throw new Error('Unauthenticated!');
    }
    console.log(JSON.stringify(args));
    try {
      const owner = await Content.findById({_id:args.contentId});
      console.log("owner..." + owner);
      if (owner.creator._id != pocketVariables.user._id ) {
        throw new Error('Not the creator! No edit permission');
      }
      const content = await Content.findOneAndUpdate({_id:args.contentId},{
        title: args.contentInput.title,
        domain: args.contentInput.domain,
        category: args.contentInput.category,
        creator: args.contentInput.creator
      },{new: true});
        return {
          ...content._doc,
          _id: content.id,
          title: content.title,
          domain: content.domain,
          category: content.category,
          creator: content.creator
        };
    } catch (err) {
      throw err;
    }
  },
  updateContentUser: async (args, req) => {
    if (!req.isAuth) {
      throw new Error('Unauthenticated!');
    }
    console.log("args..." + JSON.stringify(args));
    try {
      const owner = await Content.findById({_id:args.contentId});
      console.log("owner..." + owner);
      if (owner.creator._id != pocketVariables.user._id ) {
        throw new Error('Not the creator! No edit permission');
      }
      const content= await Content.findOneAndUpdate({_id:args.contentId},{$addToSet: {users:args.userRefInput}},{new: true});
        return {
          ...content._doc,
          _id: content.id,
          title: content.title,
          domain: content.domain,
          category: content.category,
          creator: content.creator,
          users: content.users
        };
    } catch (err) {
      throw err;
    }
  },
  updateContentData: async (args, req) => {
    if (!req.isAuth) {
      throw new Error('Unauthenticated!');
    }
    console.log("args..." + JSON.stringify(args));
    try {
      const owner = await Content.findById({_id:args.contentId});
      console.log("owner..." + owner);
      if (owner.creator._id != pocketVariables.user._id ) {
        throw new Error('Not the creator! No edit permission');
      }
      const content = await Content.findOneAndUpdate({_id:args.contentId},{$addToSet: {data:args.contentDataInput}},{new: true});
        return {
          ...content._doc,
          _id: content.id,
          title: content.title,
          domain: content.domain,
          category: content.category,
          creator: content.creator,
          users: content.users,
          data: content.data
        };
    } catch (err) {
      throw err;
    }
  },
  updateContentAction: async (args, req) => {
    if (!req.isAuth) {
      throw new Error('Unauthenticated!');
    }
    console.log("args..." + JSON.stringify(args));
    try {
      const owner = await Content.findById({_id:args.contentId});
      console.log("owner..." + owner);
      if (owner.creator._id != pocketVariables.user._id ) {
        throw new Error('Not the creator! No edit permission');
      }
      const content = await Content.findOneAndUpdate({_id:args.contentId},{$addToSet: {actions:args.actionRefInput}},{new: true});
        return {
          ...content._doc,
          _id: content.id,
          title: content.title,
          domain: content.domain,
          category: content.category,
          creator: content.creator,
          users: content.users,
          data: content.data,
          actions: content.actions
        };
    } catch (err) {
      throw err;
    }
  },
  updateContentPerk: async (args, req) => {
    if (!req.isAuth) {
      throw new Error('Unauthenticated!');
    }
    console.log("args..." + JSON.stringify(args));
    try {
      const owner = await Content.findById({_id:args.contentId});
      console.log("owner..." + owner);
      if (owner.creator._id != pocketVariables.user._id ) {
        throw new Error('Not the creator! No edit permission');
      }
      const content = await Content.findOneAndUpdate({_id:args.contentId},{$addToSet: {perks:args.perkRefInput}},{new: true});
        return {
          ...content._doc,
          _id: content.id,
          title: content.title,
          domain: content.domain,
          category: content.category,
          creator: content.creator,
          users: content.users,
          data: content.data,
          actions: content.actions,
          perks: content.perks
        };
    } catch (err) {
      throw err;
    }
  },
  updateContentComment: async (args, req) => {
    if (!req.isAuth) {
      throw new Error('Unauthenticated!');
    }
    console.log("args..." + JSON.stringify(args));
    try {
      const owner = await Content.findById({_id:args.contentId});
      console.log("owner..." + owner);
      if (owner.creator._id != pocketVariables.user._id ) {
        throw new Error('Not the creator! No edit permission');
      }
      const content = await Content.findOneAndUpdate({_id:args.contentId},{$addToSet: {actions:args.commentInput}},{new: true});
        return {
          ...content._doc,
          _id: content.id,
          title: content.title,
          domain: content.domain,
          category: content.category,
          creator: content.creator,
          users: content.users,
          data: content.data,
          actions: content.actions
        };
    } catch (err) {
      throw err;
    }
  },
  updateContentUpvotes: async (args, req) => {
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

      const content = await Content.findOneAndUpdate({_id:args.contentId},{$inc: {upvotes:1}},{new: true});
        return {
          ...content._doc,
          _id: group.id,
          title: content.title,
          upvotes: content.upvotes
        };
    } catch (err) {
      throw err;
    }
  },
  updateContentDownvotes: async (args, req) => {
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

      const content = await Content.findOneAndUpdate({_id:args.contentId},{$inc: {downvotes:1}},{new: true});
        return {
          ...content._doc,
          _id: content.id,
          title: content.title,
          downvotes: content.downvotes
        };
    } catch (err) {
      throw err;
    }
  },
  updateContentTag: async (args, req) => {
    if (!req.isAuth) {
      throw new Error('Unauthenticated!');
    }
    console.log("args..." + JSON.stringify(args));
    try {
      const owner = await Content.findById({_id:args.contentId});
      console.log("owner..." + owner);
      if (owner.creator._id != pocketVariables.user._id ) {
        throw new Error('Not the creator! No edit permission');
      }
      const content = await Content.findOneAndUpdate({_id:args.contentId},{$addToSet: {tags:args.tags}},{new: true});
        return {
          ...content._doc,
          _id: content.id,
          title: content.title,
          domain: content.domain,
          category: content.category,
          creator: content.creator,
          users: content.users,
          data: content.data,
          actions: content.actions,
          tags: content.tags
        };
    } catch (err) {
      throw err;
    }
  },
  deleteContent: async (args, req) => {
    if (!req.isAuth) {
      throw new Error('Unauthenticated!');
    }
    console.log("args..." + JSON.stringify(args));
    try {
      const owner = await Content.findById({_id:args.contentId});
      console.log("owner..." + owner);
      if (owner.creator._id != pocketVariables.user._id ) {
        throw new Error('Not the creator! No edit permission');
      }
      const content = await Content.findByIdAndRemove(args.contentId);
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
  createContent: async (args,req) => {
    if (!req.isAuth) {
      throw new Error('Unauthenticated!');
    }
    console.log("args..." + JSON.stringify(args));
    try {
      const existingContent = await Content.findOne({ title: args.contentInput.title });
      if (existingContent) {
        throw new Error('Title exists already.');
      }
      const content = new Content({
        title: args.contentInput.title,
        domain: args.contentInput.domain,
        category: args.contentInput.category,
        creator: args.contentInput.creator,
        description: args.contentInput.description,
        ContentType: args.contentInput.ContentType,
        actions: args.contentInput.actions
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
        creator: result.creator,
        ContentType: result.ContentType
      };
    } catch (err) {
      throw err;
    }
  },
};
