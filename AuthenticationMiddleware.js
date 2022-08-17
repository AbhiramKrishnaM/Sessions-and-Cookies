function checkSession(req, res, next) {
  if (req.session.user) next();
  else {
    res.status(401).json("Unauthenticated");
  }
}

module.exports = checkSession;
