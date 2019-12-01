const utils = require('../utils/utils');

const express = require("express");
const router = express.Router();
const formdata = require('form-data');

router.get('/', function (req, res, next) {
  let requestData = new formdata();

  requestData.append("client_id", "TECHSINF");
  requestData.append("client_secret", "bf09564a-e496-42f1-8a32-00d6a0f8922e");
  requestData.append("grant_type", "client_credentials");
  requestData.append("scope", "application");
  
  utils.createRequest('post', 'https://identity.primaverabss.com/connect/token', requestData, false)
      .then((res) => {
          console.log(res.data);
      }).catch((err) => {
          console.log(err);
  });
});

module.exports = router;