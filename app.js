var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var api = require('./routes/api');

const mongoose = require('./utils/mongo');
const User = require('./models/User');

var app = express();
// router.use('/public', express.static(__dirname + '/public'));
// router.use(express.static('public'))
<<<<<<< HEAD
app.use('/public', express.static(path.join(__dirname, 'public', 'uploads')));
=======
app.use('/public',express.static(path.join(__dirname, "public", "uploads")))
>>>>>>> 4481d55a31f7ec91be1c6b0a01f06331252d1756

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/api', api);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.set('view engine', 'jade');
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
