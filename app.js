var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const mongoose  = require('mongoose');
const bodyParser = require ('body-parser');
var session = require('express-session');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var flash = require('connect-flash');
const passport = require('passport');
const passport_local =require('passport-local');
var app = express();

// view engine setup

var swig = require('swig');
app.engine('html',swig.renderFile);

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html');

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//express session 
app.use(session({secret:'ashish',resave:true,saveUninitialized:true}));


//passport middleware
app.use(passport.initialize());
app.use(passport.session());

//connect flash
app.use(flash());

app.use('/', indexRouter);
app.use('/users', usersRouter);


/////////////mongoose connection
mongoose.connect('mongodb://localhost:27017/loginData',{ useNewUrlParser: true },()=>console.log("Db Connected"))

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render(err);

});

//passport config
require('./config/passport')(passport);

module.exports = app;
