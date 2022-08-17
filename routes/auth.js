const axios = require("axios");

const express = require("express");

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
      if (!req.session.user) {
        req.session.user = response.data.data;

        res.status(200).json("Authenticated");
      } else {
        res.status(401).json("Already a user");
      }
    }
  } catch (err) {
    res.status(401).send("Bad credentials");
  }
});

module.exports = router;
