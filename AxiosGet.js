const axios = require("axios");

async function _getData(_url, _apiToken) {
  try {
    const _response = await axios.get(`${process.env.BASE_MMIP_URL}${_url}`, {
      headers: { Authorization: `Bearer ${_apiToken}` },
    });
    if (_response.status === 200) return _response;
  } catch (error) {
    return error;
  }
}

module.exports = _getData;
