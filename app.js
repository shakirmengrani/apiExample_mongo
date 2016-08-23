var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var passport = require('passport');
var jwt = require('express-jwt');
var cors = require('cors');
var session = require('express-session');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
require('./models/models');
var index = require('./routes/index');
var api = require('./routes/api');
var authenticate = require('./routes/authenticate')(passport);
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/chrip-test',function(err){
  if (err) throw err;
});
var app = express();
app.use(cors());

var jwtCheck =  jwt({
  secret:  new Buffer("m1F01BykD-au6qcBfhKtMxiGhtTvXv7fdUS7HiJYuVI8A3TY7PzXyoGPtPer6wD-",'base64'),
  audience: "gL4tLAdSGsGMGmMgjDX2DFFsqp3DAMYT"
});



// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(session({
  secret:'super secret'
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(passport.initialize());
app.use(passport.session());

var initPassport = require('./passport-init');
initPassport(passport);

app.get('/',function(req,res){
  return res.render("angular2");
});

app.use('/app', express.static(path.join(__dirname, '/dist')));
app.use('/node_modules', express.static(path.join(__dirname, '/node_modules')));
app.use('/auth',authenticate);
app.use ('/api',api);
app.use('/say',jwtCheck);
app.get('/say',function(req,res){
  res.send("Hello")
});
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers
// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
