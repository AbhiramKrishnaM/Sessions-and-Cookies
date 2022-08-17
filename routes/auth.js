const axios = require("axios");

const express = require("express");

const users = require("../user.js");

let router = express.Router();

router.post("/login", async (req, res) => {
  const form = req.body;

  try {
    // call the url
    const response = await axios.post(
      "https://qc.mmp.iocod.com/api/admin-login",
      form
    );

    if (response.status === 200) {
      // save the api_token to database

      if (req.session.user) {
        res.send("You are already logged in");
      } else {
        req.session.user = { email: req.body.email };
      }
      res.status(200).json("Authenticated");
    }
  } catch (err) {
    res.status(401).send("Bad credentials");
  }
});

module.exports = router;
