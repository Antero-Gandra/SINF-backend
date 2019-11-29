const express = require("express");
const router = express.Router();
const axios = require('axios');
const formdata = require('form-data');

router.get('/', function (req, res, next) {
  let requestData = new formdata();

  requestData.append("client_id", "TECHSINF");
  requestData.append("client_secret", "4f8c8e8d-8106-40e5-a6c4-ea728dabf541");
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