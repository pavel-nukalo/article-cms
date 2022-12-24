exports.check = () => {
  return (req, res, next) => {
    if (!req.isAuthenticated()) {
      return res.sendStatus(403);
    }

    next();
  };
};