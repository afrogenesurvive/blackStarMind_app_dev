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

module.exports = {
  contents: async (req) => {
    // if (!req.isAuth) {
    //   throw new Error('Unauthenticated!');
    // }
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
    // if (!req.isAuth) {
    //   throw new Error('Unauthenticated!');
    // }
    // console.log(args.username);
    try {
      // const user = await User.findOne(args.username);
      const content = await Content.findById(args._id);
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
  getContentTitle: async (args, req) => {
    // if (!req.isAuth) {
    //   throw new Error('Unauthenticated!');
    // }
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
    // if (!req.isAuth) {
    //   throw new Error('Unauthenticated!');
    // }
    try {
      const content = await Content.findOne({domain: args.domain});
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
  updateContent: async (args, req) => {
    // if (!req.isAuth) {
    //   throw new Error('Unauthenticated!');
    // }
    console.log(JSON.stringify(args));
    try {
      const content = await Content.findOneAndUpdate({_id:args.contentId},{
        // {
        title: args.contentInput.title,
        domain: args.contentInput.domain,
        category: args.contentInput.category,
        creator: args.contentInput.creator
      // }
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
  updateContentData: async (args, req) => {
    // if (!req.isAuth) {
    //   throw new Error('Unauthenticated!');
    // }
    console.log(JSON.stringify(args));
    try {
      const content = await Content.findOneAndUpdate({_id:args.contentId},{$push: {data:args.contentDataInput}},{new: true});
      // const user = await User.findById(userId);
        return {
          ...content._doc,
          _id: content.contentId,
          title: content.title,
          domain: content.domain,
          category: content.category,
          creator: content.creator
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
