const express = require("express");

const _postData = require("../AxiosPost");

const router = express.Router();

router.post("/*", async (req, res) => {
  const _lastUrl = req.originalUrl;
  const _apiToken = req.session.user.api_token;

  const _form = { ...req.body };

  const response = await _postData(_lastUrl, _apiToken, _form);
  res.status(200).json(response);
});

module.exports = router;
