var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var passport = require('passport');
var cors = require('cors');
var session = require('express-session');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
require('./models/models');
var index = require('./routes/index');
var api = require('./routes/api');
var authenticate = require('./routes/authenticate')(passport);
var mongoose = require('mongoose');
var firebase = require('firebase');
var io = require("socket.io")(app);
// mongoose.connect('mongodb://localhost:27017/chrip-test',function(err){
//   if (err) throw err;
// });

// firebase.initializeApp({
//   serviceAccount: "shakirmengrani-6ba0ca74896d.json",
//   databaseURL: "https://shakirmengrani-8c9b1.firebaseio.com"
// });


var app = express();
app.use(cors());

// socket io start
  io.on('connection',function(sock){
     sock.emit('news',{ say: 'Hello User' });
  });

// socket io end



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
app.post('/login/access_token',function(req,res){
  var token = firebase.auth().createCustomToken("Hello_Custom_User_Id");
  res.send(token);
});
app.get('/login/:token',function(req,res){
  // var myToken = "";
  // firebase.auth().verifyIdToken(req.params.token).then(function(token){
  //   myToken = token;
  //   res.send(myToken);    
  // }).catch(function(error){
  //   console.log(error); 
  // });
  res.send("some uid");
});

app.use('/app', express.static(path.join(__dirname, '/dist')));
app.use('/node_modules', express.static(path.join(__dirname, '/node_modules')));
app.use('/auth',authenticate);
app.use ('/api',api);
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
