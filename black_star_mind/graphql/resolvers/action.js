const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const DataLoader = require('dataloader');

const User = require('../../models/user');
const Group = require('../../models/group');
const Perk = require('../../models/perk');
const Content = require('../../models/content');
const Action = require('../../models/action');
const Search = require('../../models/search');
const Message = require('../../models/message');

const { transformAction } = require('./merge');
const { dateToString } = require('../../helpers/date');
const { pocketVariables } = require('../../helpers/pocketVars');

module.exports = {
  actions: async (args,req) => {
    if (!req.isAuth) {
      throw new Error('Unauthenticated!');
    }
    console.log("args..." + JSON.stringify(args));
    try {
      const actions = await Action.find()
      .populate('creator')

      return actions.map(action => {
        return transformAction(action);
      });
    } catch (err) {
      throw err;
    }
  },
  getActionId: async (args, req) => {
    if (!req.isAuth) {
      throw new Error('Unauthenticated!');
    }
    console.log("args..." + JSON.stringify(args));
    try {
      const action = await Action.findById(args.actionId).populate('creator');
        return {
            ...action._doc,
            _id: action.id,
            createdAt: action.createdAt,
            updatedAt: action.updatedAt,
            creator: action.creator,
            type: action.type,
            body: action.body
        };
    } catch (err) {
      throw err;
    }
  },
  getActionCreator: async (args, req) => {
    if (!req.isAuth) {
      throw new Error('Unauthenticated!');
    }
    console.log("args..." + JSON.stringify(args));
    try {
      const creator = await User.findById({_id: args.creatorId});
      console.log("content creator... " + creator);

      const actions = await Action.find({'creator': creator}).populate('creator');
      return actions.map(action => {
        return transformAction(action);
      });
        // {
        //    ...action._doc,
            // _id: action.id,
            // createdAt: action.createdAt,
            // updatedAt: action.updatedAt,
            // creator: action.creator,
            // type: action.type,
            // body: action.body
        // };
    } catch (err) {
      throw err;
    }
  },
  getActionType: async (args, req) => {
    if (!req.isAuth) {
      throw new Error('Unauthenticated!');
    }
    console.log("args..." + JSON.stringify(args));
    try {
      const actions = await Action.find({type: args.type}).populate('creator');
      return actions.map(action => {
        return transformAction(action);
      });
      // {
      //    ...action._doc,
          // _id: action.id,
          // createdAt: action.createdAt,
          // updatedAt: action.updatedAt,
          // creator: action.creator,
          // type: action.type,
          // body: action.body
      // };
    } catch (err) {
      throw err;
    }
  },
  getActionBody: async (args, req) => {
    if (!req.isAuth) {
      throw new Error('Unauthenticated!');
    }
    console.log("args..." + JSON.stringify(args));
    try {
      const actions = await Action.find({'body': args.body}).populate('creator');
      return actions.map(action => {
        return transformAction(action);
      });
      // {
      //    ...action._doc,
          // _id: action.id,
          // createdAt: action.createdAt,
          // updatedAt: action.updatedAt,
          // creator: action.creator,
          // type: action.type,
          // body: action.body
      // };
    } catch (err) {
      throw err;
    }
  },
  updateAction: async (args, req) => {
    if (!req.isAuth) {
      throw new Error('Unauthenticated!');
    }
    console.log("args..." + JSON.stringify(args));
    try {
      const action = await Action.findOneAndUpdate({_id:args.actionId},{
        type: args.actionInput.type,
        user: args.actionInput.user,
        body: args.actionInput.body
      },{new: true});
        return {
          ...action._doc,
          _id: action.id,
          createdAt: action.createdAt,
          updatedAt: action.updatedAt,
          creator: action.creator,
          type: action.type,
          body: action.body
        };
    } catch (err) {
      throw err;
    }
  },
  deleteAction: async (args, req) => {
    if (!req.isAuth) {
      throw new Error('Unauthenticated!');
    }
    console.log("args..." + JSON.stringify(args));
    try {
      const action = await Action.findByIdAndRemove(args.actionId);
        return {
          ...action._doc,
          _id: action.id
        };
    } catch (err) {
      throw err;
    }
  },
  createAction: async (args,req) => {
    if (!req.isAuth) {
      throw new Error('Unauthenticated!');
    }
    console.log("graphql creating action...");
    console.log("args..." + JSON.stringify(args));
    try {
      const creator = await User.findById({_id:args.userId});
      const creatorId = creator.id
      console.log("creator... " + creator);
      console.log("creatorId... " + creatorId);

      const action = new Action({
        creator: creator,
        type: args.actionInput.type,
        body: args.actionInput.body
      });

      const result = await action.save();

      return {
        ...action._doc,
        _id: action.id,
        creator: action.creator,
        createdAt: action.createdAt,
        updatedAt: action.updatedAt,
        type: action.type,
        body: action.body

      };
    } catch (err) {
      throw err;
    }
  },
};
