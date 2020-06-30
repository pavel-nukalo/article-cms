const express = require('express');
const router = express.Router();

const passport = require('passport');

router.post('/signin', (req, res, next) => {
  passport.authenticate('local', (err, user) => {
    if (err) return next(err);

    if (!user) return res.sendStatus(401);

    req.logIn(user, err => {
      if (err) next(err);
      else res.json(user);
    });
  })(req, res, next);
});

router.post('/signout', (req, res) => {
  req.logout();
  res.sendStatus(200);
});

module.exports = router;