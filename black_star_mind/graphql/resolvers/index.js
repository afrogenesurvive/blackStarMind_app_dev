const authResolver = require('./auth');
const userResolver = require('./user');
const groupResolver = require('./group');
const contentResolver = require('./content');
const perkResolver = require('./perk');
const actionResolver = require('./action');
// const interactionResolver = require('./interaction');
// const searchResolver = require('./search');


const rootResolver = {
  ...authResolver,
  ...userResolver,
  ...groupResolver,
  ...contentResolver,
  ...perkResolver,
  ...actionResolver
  // ...interactionResolver,
  // ...searchResolver
};

module.exports = rootResolver;
