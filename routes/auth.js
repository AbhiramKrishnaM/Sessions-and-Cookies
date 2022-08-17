const express = require("express");

const users = require("../user.js");

let router = express.Router();

router.post("/login", (req, res) => {
  const { email, password } = req.body;

  if (email && password) {
    if (req.session.user) {
      res.send("You are already logged in");
    } else {
      req.session.user = { email };
      res.send(req.session);
    }
  } else response.status(401);
});

module.exports = router;
