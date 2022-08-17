const express = require("express");

const { _getData, _postData } = require("../AxiosGetPost");

const router = express.Router();

router.get("/*", async (req, res) => {
  const _lastUrl = req.originalUrl;
  const _apiToken = req.session.user.api_token;

  //   switch
  switch (_lastUrl) {
    case "/api/get-user-details":
      const response = await _postData(_lastUrl, _apiToken, {});
      res.status(200).json(response);
      break;
    case y:
      // code block
      break;
    default:
    // code block
  }
});

router.post("/*", (req, res) => {});

module.exports = router;
