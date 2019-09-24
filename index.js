var express = require("express");
var logger = require("morgan");
var bodyParser = require("body-parser");
var path = require("path");
require('./passport');
var passport = require('passport');

var cookieParser = require('cookie-parser');
var session = require('express-session');
const seq = require("./config/config");
var flash=require("connect-flash");


var app = express();
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
app.use(logger("dev"));
app.use(bodyParser.json());
require('./routes/userRoute')(app);

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user) {
    done(err, user);
  });
});

app.listen(8080, function() {
  console.log("Server running");
});

module.exports = app;
