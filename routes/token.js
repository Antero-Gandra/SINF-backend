const express = require("express");
const router = express.Router();
const axios = require('axios');
const formdata = require('form-data');

router.get('/', function (req, res, next) {
  let requestData = new formdata();

  requestData.append("client_id", "TECHSINF");
  requestData.append("client_secret", "bf09564a-e496-42f1-8a32-00d6a0f8922e");
  requestData.append("grant_type", "client_credentials");
  requestData.append("scope", "application");
  
  createRequest('post', 'https://identity.primaverabss.com/connect/token', requestData, false)
      .then((res) => {
          console.log(res.data);
      }).catch((err) => {
          console.log(err);
  });
});
  
function createRequest(method, url, requestData, authorization)
{
  let headers;
  
  if(authorization) {
    headers = Object.assign({
      'Authorization': token,
    }, requestData.getHeaders());
  }

  else 
    headers = requestData.getHeaders();

  return axios({
    url: url,
    method: method,
    data: requestData,
    headers: headers
  });
}

module.exports = router;