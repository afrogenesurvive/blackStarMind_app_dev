const authResolver = require('./auth');
const userResolver = require('./user');
const groupResolver = require('./group');
const contentResolver = require('./content');
const perkResolver = require('./perk');
const actionResolver = require('./action');
const searchResolver = require('./search');


const rootResolver = {
  ...authResolver,
  ...userResolver,
  ...groupResolver,
  ...contentResolver,
  ...perkResolver,
  ...actionResolver,
  ...searchResolver
};

module.exports = rootResolver;
