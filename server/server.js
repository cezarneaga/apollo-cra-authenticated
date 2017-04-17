const express = require('express');
require('dotenv').config();
const models = require('./models');
const expressGraphQL = require('express-graphql');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const session = require('express-session');
const passport = require('passport');
const passportConfig = require('./services/auth');
const MongoStore = require('connect-mongo')(session);
const schema = require('./schema/schema');

const app = express();

// Rename .envtemplate to .env and add your mongoLab URI
const MONGO_URI = process.env.MONGO_DB;

// Mongoose's built in promise library is deprecated, replace it with ES2015 Promise
mongoose.Promise = global.Promise;

// Connect to the mongoDB instance and log a message
// on success or failure
mongoose.connect(MONGO_URI);
mongoose.connection
  .once('open', () => console.log('Connected to MongoLab instance.'))
  .on('error', error => console.log('Error connecting to MongoLab:', error));

// Configures express to use sessions.  This places an encrypted identifier
// on the users cookie.  When a user makes a request, this middleware examines
// the cookie and modifies the request object to indicate which user made the request
// The cookie itself only contains the id of a session; more data about the session
// is stored inside of MongoDB.
app.use(
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
app.use(passport.initialize());
app.use(passport.session());

// Instruct Express to pass on any request made to the '/api' route
// to the GraphQL instance.

app.use(
  '/api',
  bodyParser.json(),
  expressGraphQL({
    schema,
    graphiql: true,
  })
);
const corsMiddleware = cors({
  origin: 'http://localhost:3000',
  credentials: true,
});
app.use(corsMiddleware);
app.options(corsMiddleware);
module.exports = app;
