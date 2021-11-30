var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const myRequestLogger = require('./middleware/requestlogger')
const myErrorLogger = require('./middleware/errorlogger')
var indexRouter = require('./routes/index');
// var usersRouter = require('./routes/users');

var app = express();

app.use(myRequestLogger);
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public'), {index: '_'}));
 
// Set the default templating engine to ejs
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));


app.use('/', indexRouter);
app.use(myErrorLogger); //Error Log middleware

process.on('unhandledRejection', (reason, promise) => {
    console.log('Unhandled Rejection at:', reason.stack || reason)
})

module.exports = app;
