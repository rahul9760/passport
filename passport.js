var passport = require('passport')
  , LocalStrategy = require('passport-local').Strategy;
  var User = require('./models/user');
  
  
  
  passport.use(new LocalStrategy({
    usernameField: 'email',
    passReqToCallback : true
  },
  
  function(email, done) {
  User.findOne({
    email: email
  }, function(err, user) {
    if (err) {
      return done(err);
    } else {
    return done(null, user);
    }
  });
  }
));



  
    
   