var express = require('express');
var router = express.Router();

var passport = require('passport');

router.post('/signin', function (req, res, next) {
  passport.authenticate('local', function (err, user) {
    if (err) return next(err);  
    
    if (!user) return res.sendStatus(401);  

    req.logIn(user, function (err) {
      if (err) next(err);
      else res.json(user);
    });
  })(req, res, next);
});

router.post('/signout', function (req, res) {
  req.logout();
  res.sendStatus(200);
});

module.exports = router;