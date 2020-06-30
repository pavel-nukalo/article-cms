var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

var userModel = require('../models/user');

var strategy = new LocalStrategy({ usernameField: 'email' }, function (email, password, done) {
  userModel.getUserByCredentials(email, password)
    .then(function (user) {
      done(null, user);
    })
    .catch(function (err) {
      done(err, null);
    });
});

passport.use(strategy);