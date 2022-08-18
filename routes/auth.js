const axios = require("axios");

const express = require("express");

let router = express.Router();

router.post("/login", async (req, res) => {
  const form = req.body;

  try {
    const response = await axios.post(
      process.env.BASE_MMIP_URL + "/api/admin-login",
      form
    );

    if (response.status === 200) {
      if (req.session.user) {
        res.send(response.data);
      } else {
        req.session.user = response.data.data;
        res.send(response.data);
      }
    } else {
      res.send(response.data);
    }
  } catch (err) {
    res.send(err.response.data);
  }
});

router.post("/logout", (req, res) => {
  if (req.session.user) {
    req.session.destroy();
    res.status(200).json({ msg: "Logged out" });
  } else {
    res.status(403).json({ msg: "Not logged in" });
  }
});

module.exports = router;
