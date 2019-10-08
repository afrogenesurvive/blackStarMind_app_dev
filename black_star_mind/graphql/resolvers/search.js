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

const { transformSearch } = require('./merge');
const { dateToString } = require('../../helpers/date');
const { pocketVariables } = require('../../helpers/pocketVars');

module.exports = {
  searches: async (args,req) => {
    if (!req.isAuth) {
      throw new Error('Unauthenticated!');
    }
    try {
      const searches = await Search.find();
      return searches.map(search => {
        return transformSearch(search);
      });
    } catch (err) {
      throw err;
    }
  },
  getSearchId: async (args, req) => {
    if (!req.isAuth) {
      throw new Error('Unauthenticated!');
    }
    try {
      const search = await Search.findById(args.searchId);
        return {
          ...search._doc,
          _id: search.id,
          type: search.type,
          user: search.user,
          query: search.query,
          response: search.response,
          actions: search.actions,
          tags: search.tags
        };
    } catch (err) {
      throw err;
    }
  },
  getSearchUser: async (args, req) => {
    if (!req.isAuth) {
      throw new Error('Unauthenticated!');
    }
    try {
      const searches = await Search.find({'user.username': args.userRefInput.username});
      return searches.map(search => {
        return transformSearch(search);
      });
      // {
      // ...search._doc,
      // _id: search.id,
      // type: search.type,
      // user: search.user,
      // query: search.query,
      // response: search.response,
      // actions: search.actions,
      // tags: search.tags
      // };
    } catch (err) {
      throw err;
    }
  },
  getSearchType: async (args, req) => {
    if (!req.isAuth) {
      throw new Error('Unauthenticated!');
    }
    try {
      const searches = await Search.find({type: args.type});
      return searches.map(search => {
        return transformSearch(search);
      });
        // {
        // ...search._doc,
        // _id: search.id,
        // type: search.type,
        // user: search.user,
        // query: search.query,
        // response: search.response,
        // actions: search.actions,
        // tags: search.tags
        // };
    } catch (err) {
      throw err;
    }
  },
  getSearchQuery: async (args, req) => {
    if (!req.isAuth) {
      throw new Error('Unauthenticated!');
    }
    try {
      const searches = await Search.find({query: args.searchQueryInput});
      return searches.map(search => {
        return transformSearch(search);
      });
      // {
      // ...search._doc,
      // _id: search.id,
      // type: search.type,
      // user: search.user,
      // query: search.query,
      // response: search.response,
      // actions: search.actions,
      // tags: search.tags
      // };
    } catch (err) {
      throw err;
    }
  },
  getSearchResponse: async (args, req) => {
    if (!req.isAuth) {
      throw new Error('Unauthenticated!');
    }
    try {
      const searches = await Search.find({response: args.searchResponseInput});
      return searches.map(search => {
        return transformSearch(search);
      });
      // {
      // ...search._doc,
      // _id: search.id,
      // type: search.type,
      // user: search.user,
      // query: search.query,
      // response: search.response,
      // actions: search.actions,
      // tags: search.tags
      // };
    } catch (err) {
      throw err;
    }
  },
  getSearchAction: async (args, req) => {
    if (!req.isAuth) {
      throw new Error('Unauthenticated!');
    }
    try {
      const searches = await Search.find({actions: args.actionRefInput});
      return searches.map(search => {
        return transformSearch(search);
      });
      // {
      // ...search._doc,
      // _id: search.id,
      // type: search.type,
      // user: search.user,
      // query: search.query,
      // response: search.response,
      // actions: search.actions,
      // tags: search.tags
      // };
    } catch (err) {
      throw err;
    }
  },
  getSearchTag: async (args, req) => {
    if (!req.isAuth) {
      throw new Error('Unauthenticated!');
    }
    try {
      const searches = await Search.find({tags: args.tags});
      return searches.map(search => {
        return transformSearch(search);
      });
      // {
      // ...search._doc,
      // _id: search.id,
      // type: search.type,
      // user: search.user,
      // query: search.query,
      // response: search.response,
      // actions: search.actions,
      // tags: search.tags
      // };
    } catch (err) {
      throw err;
    }
  },
  updateSearch: async (args, req) => {
    if (!req.isAuth) {
      throw new Error('Unauthenticated!');
    }
    try {
      const search = await Search.findOneAndUpdate({_id:args.searchId},{
        // {
        type: args.perkInput.type,
        user: args.perkInput.user,
        query: args.perkInput.query,
        response: args.perkInput.response,
        actions: args.perkInput.actions,
        tags: args.perkInput.tags
      // }
      },{new: true});
        return {
          ...search._doc,
          _id: search.id,
          type: search.type,
          user: search.user,
          query: search.query,
          response: search.response,
          actions: search.actions,
          tags: search.tags
        };
    } catch (err) {
      throw err;
    }
  },
  updateSearchUser: async (args, req) => {
    if (!req.isAuth) {
      throw new Error('Unauthenticated!');
    }
    try {
      const search = await Search.findOneAndUpdate({_id:args.searchId},{users:args.userRefInput});
      // const search = await Search.findOneAndUpdate({_id:args.searchId},{$push: {users:args.userRefInput}},{new: true});
        return {
          ...search._doc,
          _id: search.id,
          type: search.type,
          user: search.user,
          query: search.query,
          response: search.response,
          actions: search.actions,
          tags: search.tags
        };
    } catch (err) {
      throw err;
    }
  },
  updateSearchQuery: async (args, req) => {
    if (!req.isAuth) {
      throw new Error('Unauthenticated!');
    }
    try {
      const search = await Search.findOneAndUpdate({_id:args.searchId},{query:args.searchQueryInput});
      // const search = await Search.findOneAndUpdate({_id:args.searchId},{$push: {data:args.perkDataInput}},{new: true});
        return {
          ...search._doc,
          _id: search.id,
          type: search.type,
          user: search.user,
          query: search.query,
          response: search.response,
          actions: search.actions,
          tags: search.tags
        };
    } catch (err) {
      throw err;
    }
  },
  updateSearchResponse: async (args, req) => {
    if (!req.isAuth) {
      throw new Error('Unauthenticated!');
    }
    try {
      const search = await Search.findOneAndUpdate({_id:args.searchId},{$push: {response:args.searchResponseInput}},{new: true});
        return {
          ...search._doc,
          _id: search.id,
          type: search.type,
          user: search.user,
          query: search.query,
          response: search.response,
          actions: search.actions,
          tags: search.tags
        };
    } catch (err) {
      throw err;
    }
  },
  updateSearchAction: async (args, req) => {
    if (!req.isAuth) {
      throw new Error('Unauthenticated!');
    }
    try {
      const search = await Search.findOneAndUpdate({_id:args.searchId},{$push: {actions:args.actionRefInput}},{new: true});
        return {
          ...search._doc,
          _id: search.id,
          type: search.type,
          user: search.user,
          query: search.query,
          response: search.response,
          actions: search.actions,
          tags: search.tags
        };
    } catch (err) {
      throw err;
    }
  },
  updateSearchTag: async (args, req) => {
    if (!req.isAuth) {
      throw new Error('Unauthenticated!');
    }
    try {
      const search = await Search.findOneAndUpdate({_id:args.searchId},{$push: {tags:args.tags}},{new: true});
        return {
          ...search._doc,
          _id: search.id,
          type: search.type,
          user: search.user,
          query: search.query,
          response: search.response,
          actions: search.actions,
          tags: search.tags
        };
    } catch (err) {
      throw err;
    }
  },
  deleteSearch: async (args, req) => {
    if (!req.isAuth) {
      throw new Error('Unauthenticated!');
    }
    try {
      const search = await Search.findByIdAndRemove(args.searchId);
        return {
          ...search._doc,
          _id: search.id,
          type: search.type,
          user: search.user,
          query: search.query,
          response: search.response,
          actions: search.actions,
          tags: search.tags
        };
    } catch (err) {
      throw err;
    }
  },
  createSearch: async (args,req) => {
    if (!req.isAuth) {
      throw new Error('Unauthenticated!');
    }
    try {
      // const existingSearch = await Search.findOne({ name: args.perkInput.name });
      // if (existingSearch) {
      //   throw new Error('Search name exists already.');
      // }
      const perk = new Perk({
        type: args.perkInput.type,
        user: args.perkInput.user,
        query: args.perkInput.query,
        response: args.perkInput.response,
        actions: args.perkInput.actions,
        tags: args.perkInput.tags
      });

      const result = await perk.save();

      return {
        ...result._doc,
        _id: result.id,
        type: result.type,
        user: result.user,
        query: result.query,
        response: result.response,
        actions: result.actions,
        tags: result.tags
      };
    } catch (err) {
      throw err;
    }
  },
};
