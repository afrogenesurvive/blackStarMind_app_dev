const mongoose = require('mongoose');
const mongodb = require('mongodb');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);

const sessionStore = {

  db: new MongoStore({url: `mongodb+srv://profblack:Y1goCqtw71ttDblZ@sessionstorage-ylsuz.mongodb.net/test?retryWrites=true&w=majority`}),
  // db: new MongoStore({url: process.env.MONGO_URI}),
  secret: '4DuttyFloor',
  ttl: 5 * 60 * 60,
  cookie: {
    httpOnly: true,
    maxAge: 4 * 60 * 60,
    secure: true
  }
}

module.exports = sessionStore;
