const express = require('express');
const bodyParser = require('body-parser');
const graphqlHttp = require('express-graphql');
const graphQlSchema = require('./graphql/schema/index');
const graphQlResolvers = require('./graphql/resolvers/index');

const mongoose = require('mongoose');
const mongodb = require('mongodb');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);

const sessionStore = require('./middleware/sessionStore');
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

app.use(isAuth);

app.use(session ({
  resave: false,
  saveUninitialized: true,
  store: sessionStore.db,
  secret: sessionStore.secret,
  ttl: sessionStore.ttl,
  cookie: {
    httpOnly: true,
    maxAge: sessionStore.cookie.maxAge,
    secure: true
  }
}));

app.use(
  '/graphql',
  graphqlHttp({
    schema: graphQlSchema,
    rootValue: graphQlResolvers,
    graphiql: true
  })
);

mongoose.connect(process.env.MONGO_URI,{useNewUrlParser: true})
  .then(() => {
    app.listen(5000);
  })
  .catch(err => {
    console.log(err);
  });

app.use(function(req,res,next){
  req.session.store
  console.log("front page" + req.session.store);
});
