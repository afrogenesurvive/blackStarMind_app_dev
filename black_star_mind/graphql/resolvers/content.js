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

const { transformContent } = require('./merge');
const { dateToString } = require('../../helpers/date');
const { pocketVariables } = require('../../helpers/pocketVars');

module.exports = {
  content: async (args,req) => {
    if (!req.isAuth) {
      throw new Error('Unauthenticated!');
    }
    try {
      const contents = await Content.find()
      .populate('creator')
      .populate('users')
      .populate('perks')
      .populate('actions')
      .populate('comments.user');

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
      const content = await Content.findById(args.contentId)
      .populate('creator')
      .populate('users')
      .populate('perks')
      .populate('actions')
      .populate('comments.user');

        return {
            ...content._doc,
            _id: content.id,
            createdAt: content.createdAt,
            updatedAt: content.updatedAt,
            title: content.title,
            contentType: content.contentType,
            domain: content.domain,
            category: content.category,
            creator: content.creator,
            tags: content.tags
        };
    } catch (err) {
      throw err;
    }
  },
  getContentTypeMedium: async (args, req) => {
    if (!req.isAuth) {
      throw new Error('Unauthenticated!');
    }
    console.log("args..." + JSON.stringify(args));
    try {
      const contents = await Content.find({'contentType.medium': args.medium})
      .populate('creator')
      .populate('users')
      .populate('perks')
      .populate('actions')
      .populate('comments.user');

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
      const content = await Content.findOne({title: args.title})
      .populate('creator')
      .populate('users')
      .populate('perks')
      .populate('actions')
      .populate('comments.user');

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
      const contents = await Content.find({domain: args.domain})
      .populate('creator')
      .populate('users')
      .populate('perks')
      .populate('actions')
      .populate('comments.user');

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
      const contents = await Content.find({category: args.category})
      .populate('creator')
      .populate('users')
      .populate('perks')
      .populate('actions')
      .populate('comments.user');

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
      const creator = await User.findById({_id: args.creatorId});
      console.log("content creator... " + creator);

      const contents = await Content.find({'creator': creator})
      .populate('creator')
      .populate('users')
      .populate('perks')
      .populate('actions')
      .populate('comments.user');

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
      const contentUser = await User.findById({_id: args.contentUserId});
      console.log("content user... " + contentUser);

      const contents = await Content.find({'users': contentUser})
      .populate('creator')
      .populate('users')
      .populate('perks')
      .populate('actions')
      .populate('comments.user');

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
      const contentPerkObj = await Perk.findById({_id:args.perkId})
      console.log("content perk object... " + contentPerkObj);

      const contents = await Content.find({'perks': contentPerkObj})
      .populate('creator')
      .populate('users')
      .populate('perks')
      .populate('actions')
      .populate('comments.user');

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
      const commenter = await User.findById({_id: args.commentCreator});
      console.log("commenter... " + commenter);

      const contents = await Content.find({'comments.user': commenter})
      .populate('creator')
      .populate('users')
      .populate('perks')
      .populate('actions')
      .populate('comments.user');

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
      const contents = await Content.find({'comments.comment': args.comment})
      .populate('creator')
      .populate('users')
      .populate('perks')
      .populate('actions')
      .populate('comments.user');

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
  getContentUpvotes: async (args, req) => {
    if (!req.isAuth) {
      throw new Error('Unauthenticated!');
    }
    console.log("args..." + JSON.stringify(args));
    try {
      const contents = await Content.find({'upvotes.count':args.upvotes})
      .populate('creator')
      .populate('users')
      .populate('perks')
      .populate('actions')
      .populate('comments.user');

      return contents.map(content => {
        return transformContent(content);
      });
        // return {
        //     ...content._doc,
        // _id: content.id,
        // title: content.title,
        // domain: content.domain,
        // category: content.category,
        // creator: content.creator,
        // users: content.users,
        // data: content.data,
        // comments: content.comments,
        // actions: content.actions,
        // upvotes: content.upvotes,
        // downvotes: content.downvotes,
        // tags: content.tags
        // };
    } catch (err) {
      throw err;
    }
  },
  getContentDownvotes: async (args, req) => {
    if (!req.isAuth) {
      throw new Error('Unauthenticated!');
    }
    console.log("args..." + JSON.stringify(args));
    try {
      const contents = await Content.find({'downvotes.count':args.downvotes})
      .populate('creator')
      .populate('users')
      .populate('perks')
      .populate('actions')
      .populate('comments.user');

      return contents.map(content => {
        return transformContent(content);
      });
        // return {
        //     ...content._doc,
        // _id: content.id,
        // title: content.title,
        // domain: content.domain,
        // category: content.category,
        // creator: content.creator,
        // users: content.users,
        // data: content.data,
        // comments: content.comments,
        // actions: content.actions,
        // upvotes: content.upvotes,
        // downvotes: content.downvotes,
        // tags: content.tags
        // };
    } catch (err) {
      throw err;
    }
  },
  getContentTag: async (args, req) => {
    if (!req.isAuth) {
      throw new Error('Unauthenticated!');
    }
    try {
      const contents = await Content.find({tags: args.tag})
      .populate('creator')
      .populate('users')
      .populate('perks')
      .populate('actions')
      .populate('comments.user');

      return contents.map(content => {
        return transformContent(content);
      });
      // {
      //     ...content._doc,
      // _id: content.id,
      // title: content.title,
      // domain: content.domain,
      // category: content.category,
      // creator: content.creator,
      // users: content.users,
      // data: content.data,
      // comments: content.comments,
      // actions: content.actions,
      // upvotes: content.upvotes,
      // downvotes: content.downvotes,
      // tags: content.tags
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
      if (owner.creator._id != req.userId ) {
        throw new Error('Not the creator! No edit permission');
      }
      const content = await Content.findOneAndUpdate({_id:args.contentId},{
        title: args.contentInput.title,
        domain: args.contentInput.domain,
        category: args.contentInput.category,
        // creator: args.contentInput.creator
      },{new: true}).populate('creator').populate('users').populate('perks').populate('actions').populate('comments.user');
        return {
          ...content._doc,
          _id: content.id,
          title: content.title,
          domain: content.domain,
          category: content.category,
          // creator: content.creator
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
      if (owner.creator._id != req.userId ) {
        throw new Error('Not the creator! No edit permission');
      }

      const contentUser = await User.findById({_id:args.contentUserId});
      const contentUserId = contentUser.id
      console.log("contentUser... " + contentUser.username);
      console.log("contentUserId... " + contentUserId);

      const content= await Content.findOneAndUpdate({_id:args.contentId},{$addToSet: {users:contentUser}},{new: true})
      .populate('creator')
      .populate('users')
      .populate('perks')
      .populate('actions')
      .populate('comments.user')

        return {
          ...content._doc,
          _id: content.id,
          title: content.title,
          domain: content.domain,
          category: content.category,
          creator: content.creator,
          users: content.users,
          data: content.data,
          comments: content.comments,
          actions: content.actions,
          upvotes: content.upvotes,
          downvotes: content.downvotes,
          tags: content.tags
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
      console.log("requester..." + req.userId);
      if (owner.creator._id != req.userId ) {
        throw new Error('Not the creator! No edit permission');
      }
      const content = await Content.findOneAndUpdate({_id:args.contentId},{$addToSet: {data:args.contentDataInput}},{new: true})
      .populate('creator')
      .populate('users')
      .populate('perks')
      .populate('actions')
      .populate('comments.user');

        return {
          ...content._doc,
          _id: content.id,
          title: content.title,
          domain: content.domain,
          category: content.category,
          creator: content.creator,
          users: content.users,
          data: content.data,
          comments: content.comments,
          actions: content.actions,
          upvotes: content.upvotes,
          downvotes: content.downvotes,
          tags: content.tags
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
      if (owner.creator._id != req.userId ) {
        throw new Error('Not the creator! No edit permission');
      }
      const contentAction = await Action.findById({_id:args.actionId});
      const contentActionId = contentAction.id
      console.log("contentAction... " + contentAction);
      console.log("contentActionId... " + contentActionId);

      const content= await Content.findOneAndUpdate({_id:args.contentId},{$addToSet: {actions:contentAction}},{new: true})
      .populate('creator')
      .populate('users')
      .populate('perks')
      .populate('actions')
      .populate('comments.user')

        return {
          ...content._doc,
          _id: content.id,
          title: content.title,
          domain: content.domain,
          category: content.category,
          creator: content.creator,
          users: content.users,
          data: content.data,
          comments: content.comments,
          actions: content.actions,
          upvotes: content.upvotes,
          downvotes: content.downvotes,
          tags: content.tags,
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
      if (owner.creator._id != req.userId ) {
        throw new Error('Not the creator! No edit permission');
      }

      const contentPerk = await Perk.findById({_id:args.perkId});
      const contentPerkId = contentPerk.id
      console.log("contentPerk... " + contentPerk.name);
      console.log("contentPerkId... " + contentPerkId);

      const content= await Content.findOneAndUpdate({_id:args.contentId},{$addToSet: {perks:contentPerk}},{new: true})
      .populate('creator')
      .populate('users')
      .populate('perks')
      .populate('actions')
      .populate('comments.user')

        return {
          ...content._doc,
          _id: content.id,
          title: content.title,
          domain: content.domain,
          category: content.category,
          creator: content.creator,
          users: content.users,
          data: content.data,
          comments: content.comments,
          actions: content.actions,
          upvotes: content.upvotes,
          downvotes: content.downvotes,
          tags: content.tags,
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
      const commenter = await User.findById({_id: args.userId});
      console.log("commenter... " + commenter);

      // const owner = await Content.findById({_id:args.contentId});
      // console.log("owner..." + owner);
      // if (owner.creator._id != req.userId ) {
      //   throw new Error('Not the creator! No edit permission');
      // }
      const content = await Content.findOneAndUpdate({_id:args.contentId},{$addToSet: {comments:{comment:args.comment,user:commenter}}},{new: true})
      .populate('creator')
      .populate('users')
      .populate('perks')
      .populate('actions')
      .populate('comments.user');

        return {
          ...content._doc,
          _id: content.id,
          title: content.title,
          domain: content.domain,
          category: content.category,
          creator: content.creator,
          users: content.users,
          data: content.data,
          comments: content.comments,
          actions: content.actions,
          upvotes: content.upvotes,
          downvotes: content.downvotes,
          tags: content.tags
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
      // if (owner.creator._id != req.userId ) {
      //   throw new Error('Not the creator! No edit permission');
      // }

      const voteContent = await Content.findById({_id:args.contentId})
      console.log("vote content..." + voteContent.upvotes.users);
      if (voteContent.upvotes.users.includes(req.userId)) {
        throw new Error('Already Voted!');
      }
      const content = await Content.findOneAndUpdate({_id:args.contentId},{$inc: {'upvotes.count':1},$addToSet:{'upvotes.users':req.userId}},{new: true})
      .populate('creator')
      .populate('users')
      .populate('perks')
      .populate('actions')
      .populate('comments.user');

        return {
          ...content._doc,
          _id: content.id,
          title: content.title,
          domain: content.domain,
          category: content.category,
          creator: content.creator,
          users: content.users,
          data: content.data,
          comments: content.comments,
          actions: content.actions,
          upvotes: content.upvotes,
          downvotes: content.downvotes,
          tags: content.tags
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
      // if (owner.creator._id != req.userId ) {
      //   throw new Error('Not the creator! No edit permission');
      // }

      const voteContent = await Content.findById({_id:args.contentId})
      console.log("vote content..." + voteContent.downvotes.users);
      if (voteContent.downvotes.users.includes(req.userId)) {
        throw new Error('Already Voted!');
      }
      const content = await Content.findOneAndUpdate({_id:args.contentId},{$inc: {'downvotes.count':1},$addToSet:{'downvotes.users':req.userId}},{new: true})
      .populate('creator')
      .populate('users')
      .populate('perks')
      .populate('actions')
      .populate('comments.user');

        return {
          ...content._doc,
          _id: content.id,
          title: content.title,
          domain: content.domain,
          category: content.category,
          creator: content.creator,
          users: content.users,
          data: content.data,
          comments: content.comments,
          actions: content.actions,
          upvotes: content.upvotes,
          downvotes: content.downvotes,
          tags: content.tags
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
      if (owner.creator._id != req.userId ) {
        throw new Error('Not the creator! No edit permission');
      }
      const content = await Content.findOneAndUpdate({_id:args.contentId},{$addToSet: {tags:args.tags}},{new: true})
      .populate('creator')
      .populate('users')
      .populate('perks')
      .populate('actions')
      .populate('comments.user');

        return {
          ...content._doc,
          _id: content.id,
          title: content.title,
          domain: content.domain,
          category: content.category,
          creator: content.creator,
          users: content.users,
          data: content.data,
          comments: content.comments,
          actions: content.actions,
          upvotes: content.upvotes,
          downvotes: content.downvotes,
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
      if (owner.creator._id != req.userId ) {
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

      const creator = await User.findById({_id:args.userId});
      const creatorId = creator.id
      console.log("creator... " + creator);
      console.log("creatorId... " + creatorId);

      const content = new Content({
        title: args.contentInput.title,
        domain: args.contentInput.domain,
        category: args.contentInput.category,
        creator: creator,
        description: args.contentInput.description,
        contentType: args.contentInput.contentType,
        actions: args.contentInput.actions,
        tags: args.contentInput.tags
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
        ContentType: result.ContentType,
        tags: result.tags
      };
    } catch (err) {
      throw err;
    }
  },
};
