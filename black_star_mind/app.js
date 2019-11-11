const express = require('express');
const bodyParser = require('body-parser');
const graphqlHttp = require('express-graphql');
const graphQlSchema = require('./graphql/schema/index');
const graphQlResolvers = require('./graphql/resolvers/index');

const { pocketVariables } = require('./helpers/pocketVars');

const mongoose = require('mongoose');
const mongodb = require('mongodb');
// const session = require('express-session');
// const MongoStore = require('connect-mongo')(session);
// const sessionStore = require('./middleware/sessionStore');
const isAuth = require('./middleware/is-auth');

// const { execute, subscribe } = require('graphql');
// const { createServer } = require('http');
// const { SubscriptionServer } = require('subscriptions-transport-ws');
const { GraphQLServer, PubSub } = require('graphql-yoga');
const pubsub = new PubSub();

const server  = new GraphQLServer({
  schema: graphQlSchema,
  resolvers: graphQlResolvers,
  context:{ pubsub  }
})

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

// const PORT = 9000;
// const ws = createServer(app);
// ws.listen(PORT, () => {
//   console.log(`GraphQL Server is now running on http://localhost:${PORT}`);
//
//   // Set up the WebSocket for handling GraphQL subscriptions.
//   new SubscriptionServer({
//     execute,
//     subscribe,
//     graphQlSchema
//   }, {
//     server: ws,
//     path: '/subscriptions',
//   });
// });

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
  graphqlHttp({
    schema: graphQlSchema,
    rootValue: graphQlResolvers,
    graphiql: true
  })
);

const options = {
    port: 9000
  }

  server.start(options, ({ port }) =>
    console.log(
      `Server started, listening on port ${port} for subscriptions.`,
    ),
  )

// app.use('/graphiql', graphqlHttp({
//   endpointURL: '/graphql',
//   subscriptionsEndpoint: `ws://localhost:${PORT}/subscriptions` // subscriptions endpoint.
// }));

mongoose.connect(process.env.MONGO_URI,{useNewUrlParser: true, useUnifiedTopology: true})
  .then(() => {
    app.listen(5000);
  })
  .catch(err => {
    console.log(err);
});
