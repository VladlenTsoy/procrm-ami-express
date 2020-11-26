require('dotenv').config();
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

/**/
const {socketSetting} = require('./config/socket.config');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
/**/
const socketChannels = require('./channels/index');

const app = express();

/**/
socketSetting(app);

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.io.on('connection', socketChannels);

app.use('/', indexRouter);
app.use('/users', usersRouter);


module.exports = app;
