require('dotenv').config();

const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const express = require('express');
const mongoose = require('mongoose');
const logger = require('morgan');
const path = require('path');
const cors = require('cors');
const session = require('express-session');
const passport = require('./config/passport');
const MongoStore=require('connect-mongo')(session)

mongoose
  .connect(process.env.DB || 'mongodb://localhost/backend', { useNewUrlParser: true, useUnifiedTopology: true })
  .then((x) => console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`))
  .catch((err) => console.error('Error connecting to mongo', err));

const app_name = require('./package.json').name;
const debug = require('debug')(`${app_name}:${path.basename(__filename).split('.')[0]}`);

const app = express();

app.use(
  cors({
    origin: ['http://localhost:3001'],
  credentials: true
  })
);

app.use(
  session({
    resave: false,
    saveUninitialized: true,
    secret: process.env.SECRET,
    store: new MongoStore({mongooseConnection:mongoose.connection}),
    cookie: { maxAge: 1000 * 60 * 60 }
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use(express.static(path.join(__dirname, 'public/build')));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(logger('dev'));
app.use(express.static('public/build'))


const index = require('./routes/index');
const auth = require('./routes/auth');
const post=require('./routes/post')
const recoms=require('./routes/recomendation')
app.use('/', index);
app.use('/', auth);
app.use('/posts', post)
app.use('/recoms', recoms)



// Uncomment this line for production
app.get('*', (req, res) => res.sendFile(`${__dirname}/public/build/index.html`));

module.exports = app;
