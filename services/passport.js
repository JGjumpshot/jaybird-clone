var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
//bcrypt
var bcrypt = require('bcryptjs');
//app
var app = require('./../index');
var db = app.get('db');

//Verify Password
function verifyPassword(submittedPass, userPass) {
  return bcrypt.compareSync(submittedPass, userPass);
}

//Run when logging in
passport.use(new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password',
}, function(email, password, done) {
  db.user_search_email([email], function(err, user) {
    user = user[0];

    //if err, return err
    if (err) {
      done(err);
    }
    //if no user if found return false
    if (!user) {
      return done(null, false);
    }

    //if user is found, check to see if passwords match. If so, return user
    if (verifyPassword(password, user.password)) {
      return done(null, user);
    }

    return done(null, false);
  });
}));

//puts the user on the session
passport.serializeUser(function(user, done) {
  console.log(user.userid);
  done(null, user.userid);
});
passport.deserializeUser(function(id, done) {
  db.user_search_id([id], function(err, user) {
    done(err, user);
  });
});

module.exports = passport;
