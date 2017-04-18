import express from 'express';
import { models } from './models';
import { graphqlExpress, graphiqlExpress } from 'graphql-server-express';
import bodyParser from 'body-parser';
import cors from 'cors';
require('dotenv-extended').load();
import mongoose from 'mongoose';
import session from 'express-session';
import passport from 'passport';
import passportConfig from './services/auth';
const MongoStore = require('connect-mongo')(session);
import { schema } from './schema/schema';
const PORT = 4000;
const server = express();
server.use('*', cors({ origin: 'http://localhost:3000' }));
// Create .env and add your mongoLab URI

const MONGO_URI = 'mongodb://' +
  process.env.MONGO_USER +
  ':' +
  process.env.MONGO_PASS +
  '@' +
  process.env.MONGO_HOST +
  '/' +
  process.env.MONGO_DATABASE;

// Mongoose's built in promise library is deprecated, replace it with ES2015 Promise
mongoose.Promise = global.Promise;

// Connect to the mongoDB instance and log a message
// on success or failure
mongoose.connect(
  'mongodb://' + process.env.MONGO_HOST + '/' + process.env.MONGO_DATABASE,
  {
    user: process.env.MONGO_USER,
    pass: process.env.MONGO_PASS,
  }
);
mongoose.connection
  .once('open', () => console.log('Connected to MongoLab instance.'))
  .on('error', error => console.log('Error connecting to MongoLab:', error));

// Configures express to use sessions.  This places an encrypted identifier
// on the users cookie.  When a user makes a request, this middleware examines
// the cookie and modifies the request object to indicate which user made the request
// The cookie itself only contains the id of a session; more data about the session is stored inside of MongoDB.
server.use(
  session({
    resave: true,
    saveUninitialized: true,
    secret: 'aaabbbccc',
    store: new MongoStore({
      url: MONGO_URI,
      autoReconnect: true,
    }),
  })
);

// Passport is wired into express as a middleware. When a request comes in,
// Passport will examine the request's session (as set by the above config) and
// assign the current user to the 'req.user' object.  See also servces/auth.js
server.use(passport.initialize());
server.use(passport.session());

// Instruct Express to pass on any request made to the '/api' route
// to the GraphQL instance.

server.use(
  '/graphql',
  bodyParser.json(),
  graphqlExpress({
    schema,
  })
);
server.use(
  '/graphiql',
  graphiqlExpress({
    endpointURL: '/graphql',
  })
);

server.listen(PORT, () =>
  console.log(`GraphQL Server is now running on http://localhost:${PORT}`));
