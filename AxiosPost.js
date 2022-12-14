const axios = require("axios");

async function _postData(_url, _apiToken, _data) {
  try {
    const _response = await axios.post(
      `${process.env.BASE_MMIP_URL}${_url}`,
      _data,
      {
        headers: { Authorization: `Bearer ${_apiToken}` },
      }
    );

    if (_response.status === 200) return _response.data;
  } catch (error) {
    return error;
  }
}

module.exports = _postData;
