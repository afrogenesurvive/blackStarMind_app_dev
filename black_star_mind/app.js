const express = require('express');
const bodyParser = require('body-parser');
const graphqlHttp = require('express-graphql');
const graphQlSchema = require('./graphql/schema/index');
const graphQlResolvers = require('./graphql/resolvers/index');
const {PubSub} = require('graphql-subscriptions');

// import { PubSub } from 'graphql-subscriptions';
// export const pubsub = new PubSub();
const pubsub = new PubSub();

const mongoose = require('mongoose');
const mongodb = require('mongodb');
// const session = require('express-session');
// const MongoStore = require('connect-mongo')(session);

// const sessionStore = require('./middleware/sessionStore');
const isAuth = require('./middleware/is-auth');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST,GET,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }
  next();
});

// app.use(session ({
//   name: "pouch",
//   resave: true,
//   saveUninitialized: true,
//   store: sessionStore.db,
//   secret: sessionStore.secret,
//   ttl: sessionStore.ttl,
//   cookie: {
//     path: "/",
//     httpOnly: true,
//     maxAge: sessionStore.cookie.maxAge,
//     secure: false
//   }
// }));

app.use(isAuth);

app.use(
  '/graphql',
  // bodyParser.json(),
  // (req, res, next) => {
  //   console.log("front page session... " + JSON.stringify(req.session));
  //   return next();
  // },
  graphqlHttp({
    schema: graphQlSchema,
    rootValue: graphQlResolvers,
    graphiql: true,
    context: pubsub
  })
);

mongoose.connect(process.env.MONGO_URI,{useNewUrlParser: true, useUnifiedTopology: true})
  .then(() => {
    app.listen(5000);
  })
  .catch(err => {
    console.log(err);
});
