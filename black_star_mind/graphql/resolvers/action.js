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

const { transformAction } = require('./merge');
const { dateToString } = require('../../helpers/date');
const { pocketVariables } = require('../../helpers/pocketVars');

module.exports = {
  actions: async (args,req) => {
    if (!req.isAuth) {
      throw new Error('Unauthenticated!');
    }
    try {
      const actions = await Action.find();
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
    try {
      const action = await Action.findById(args.actionId);
        return {
            ...action._doc,
            _id: action.id,
            createdAt: action.createdAt,
            updatedAt: action.updatedAt,
            type: action.type,
            subtype: action.subtype,
            target: action.target,
            creator: action.creator,
            users: action.users,
            description: action.description,
            data: action.data
        };
    } catch (err) {
      throw err;
    }
  },
  getActionCreator: async (args, req) => {
    if (!req.isAuth) {
      throw new Error('Unauthenticated!');
    }
    try {
      const actions = await Action.find({creator: args.creator});
      return actions.map(action => {
        return transformAction(action);
      });
        // {
        //    ...action._doc,
            // _id: action.id,
            // createdAt: action.createdAt,
            // updatedAt: action.updatedAt,
            // type: action.type,
            // subtype: action.subtype,
            // target: action.target,
            // creator: action.creator,
            // users: action.users,
            // description: action.description,
            // data: action.data
        // };
    } catch (err) {
      throw err;
    }
  },
  getActionUser: async (args, req) => {
    if (!req.isAuth) {
      throw new Error('Unauthenticated!');
    }
    try {
      const actions = await Action.find({'users.username': args.userRefInput.username});
      return actions.map(action => {
        return transformAction(action);
      });
      // {
      //    ...action._doc,
          // _id: action.id,
          // createdAt: action.createdAt,
          // updatedAt: action.updatedAt,
          // type: action.type,
          // subtype: action.subtype,
          // target: action.target,
          // creator: action.creator,
          // users: action.users,
          // description: action.description,
          // data: action.data
      // };
    } catch (err) {
      throw err;
    }
  },
  getActionType: async (args, req) => {
    if (!req.isAuth) {
      throw new Error('Unauthenticated!');
    }
    try {
      const actions = await Action.find({type: args.type});
      return actions.map(action => {
        return transformAction(action);
      });
      // {
      //    ...action._doc,
          // _id: action.id,
          // createdAt: action.createdAt,
          // updatedAt: action.updatedAt,
          // type: action.type,
          // subtype: action.subtype,
          // target: action.target,
          // creator: action.creator,
          // users: action.users,
          // description: action.description,
          // data: action.data
      // };
    } catch (err) {
      throw err;
    }
  },
  getActionTarget: async (args, req) => {
    if (!req.isAuth) {
      throw new Error('Unauthenticated!');
    }
    try {
      const actions = await Action.find({target: args.contentRefInput});
      return actions.map(action => {
        return transformAction(action);
      });
      // {
      //    ...action._doc,
          // _id: action.id,
          // createdAt: action.createdAt,
          // updatedAt: action.updatedAt,
          // type: action.type,
          // subtype: action.subtype,
          // target: action.target,
          // creator: action.creator,
          // users: action.users,
          // description: action.description,
          // data: action.data
      // };
    } catch (err) {
      throw err;
    }
  },
  getActionTag: async (args, req) => {
    if (!req.isAuth) {
      throw new Error('Unauthenticated!');
    }
    try {
      const contents = await Action.find({tags: args.tags});
      return contents.map(content => {
        return transformAction(content);
      });
      // {
      //    ...action._doc,
          // _id: action.id,
          // createdAt: action.createdAt,
          // updatedAt: action.updatedAt,
          // type: action.type,
          // subtype: action.subtype,
          // target: action.target,
          // creator: action.creator,
          // users: action.users,
          // description: action.description,
          // data: action.data
      // };
    } catch (err) {
      throw err;
    }
  },
  updateAction: async (args, req) => {
    if (!req.isAuth) {
      throw new Error('Unauthenticated!');
    }
    try {
      const action = await Action.findOneAndUpdate({_id:args.actionId},{
        // {
        type: args.actionInput.type,
        target: args.actionInput.target,
        creator: args.actionInput.creator,
        description: args.actionInput.description,
      // }
      },{new: true});
        return {
          ...action._doc,
          _id: action.id,
          createdAt: action.createdAt,
          updatedAt: action.updatedAt,
          type: action.type,
          target: action.target,
          creator: action.creator,
          description: action.description,
        };
    } catch (err) {
      throw err;
    }
  },
  updateActionSubtype: async (args, req) => {
    if (!req.isAuth) {
      throw new Error('Unauthenticated!');
    }
    try {
      const action = await Action.findOneAndUpdate({_id:args.actionId},{subtype: args.actionSubtypeInput},{new: true});
        return {
          ...action._doc,
          _id: action.id,
          createdAt: action.createdAt,
          updatedAt: action.updatedAt,
          type: action.type,
          subtype: action.subtype,
          target: action.target,
          creator: action.creator,
          description: action.description,
        };
    } catch (err) {
      throw err;
    }
  },
  updateActionTarget: async (args, req) => {
    if (!req.isAuth) {
      throw new Error('Unauthenticated!');
    }
    try {
      const action = await Action.findOneAndUpdate({_id:args.actionId},{target: args.contentRefInput},{new: true});
        return {
          ...action._doc,
          _id: action.id,
          createdAt: action.createdAt,
          updatedAt: action.updatedAt,
          type: action.type,
          subtype: action.subtype,
          target: action.target,
          creator: action.creator,
          description: action.description,
        };
    } catch (err) {
      throw err;
    }
  },
  updateActionUser: async (args, req) => {
    if (!req.isAuth) {
      throw new Error('Unauthenticated!');
    }
    try {
      const action = await Action.findOneAndUpdate({_id:args.actionId},{$push: {users:args.userRefInput}},{new: true});
        return {
          ...action._doc,
          _id: action.id,
          createdAt: action.createdAt,
          updatedAt: action.updatedAt,
          type: action.type,
          subtype: action.subtype,
          target: action.target,
          creator: action.creator,
          description: action.description,
          users: action.users
        };
    } catch (err) {
      throw err;
    }
  },
  updateActionData: async (args, req) => {
    if (!req.isAuth) {
      throw new Error('Unauthenticated!');
    }
    try {
      const action = await Action.findOneAndUpdate({_id:args.actionId},{$push: {data:args.actionDataInput}},{new: true});
        return {
          ...action._doc,
          _id: action.id,
          createdAt: action.createdAt,
          updatedAt: action.updatedAt,
          type: action.type,
          subtype: action.subtype,
          target: action.target,
          creator: action.creator,
          description: action.description,
          users: action.users,
          data: action.data
        };
    } catch (err) {
      throw err;
    }
  },
  updateActionTag: async (args, req) => {
    if (!req.isAuth) {
      throw new Error('Unauthenticated!');
    }
    try {
      const action = await Action.findOneAndUpdate({_id:args.actionId},{$push: {tags:args.tags}},{new: true});
        return {
          ...action._doc,
          _id: action.id,
          createdAt: action.createdAt,
          updatedAt: action.updatedAt,
          type: action.type,
          subtype: action.subtype,
          target: action.target,
          creator: action.creator,
          description: action.description,
          users: action.users,
          data: action.data,
          tags: action.tags
        };
    } catch (err) {
      throw err;
    }
  },
  deleteAction: async (args, req) => {
    if (!req.isAuth) {
      throw new Error('Unauthenticated!');
    }
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
    try {
      // const existingContent = await Action.findOne({ title: args.actionInput.title });
      // if (existingContent) {
      //   throw new Error('Title exists already.');
      // }
      const action = new Action({
        type: args.actionInput.type,
        subtype: args.actionInput.subtype,
        target: args.actionInput.target,
        creator: args.actionInput.creator,
        description: args.actionInput.description,
        users: args.actionInput.users,
        data: args.actionInput.data
      });

      const result = await action.save();

      return {
        ...action._doc,
        _id: action.id,
        createdAt: action.createdAt,
        updatedAt: action.updatedAt,
        type: action.type,
        subtype: action.subtype,
        target: action.target,
        creator: action.creator,
        description: action.description,
        users: action.users,
        data: action.data,
        tags: action.tags
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
