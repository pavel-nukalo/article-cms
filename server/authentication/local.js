const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const userModel = require('../models/user');

const strategy = new LocalStrategy({ usernameField: 'email' }, async (email, password, done) => {
  try {
    const user = await userModel.getUserByCredentials(email, password);
    done(null, user);
  } catch (err) {
    done(err, null);
  }
});

passport.use(strategy);