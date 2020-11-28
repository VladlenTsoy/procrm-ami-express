require('dotenv').config();
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
require('module-alias/register')

/**/
const {corsConfig} = require("./config/cors.config");
const {socketSetting} = require('./config/socket.config');
const {amiSetting} = require('./config/ami.config');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
/**/
const socketChannels = require('./channels/index');

const app = express();

/**/
socketSetting(app);
amiSetting(app);

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

/**/
app.use(corsConfig);

/**/
app.io.on('connection', socketChannels);

/**/
app.use('/', indexRouter);
app.use('/users', usersRouter);


module.exports = app;
