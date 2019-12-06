const utils = require('../utils/utils');

const express = require("express");
const router = express.Router();
const formdata = require('form-data');

let url = utils.url;
let tenant = utils.tenant;
let organization = utils.organization;

router.get('/pId/:id', function (req, res, next) {
  let requestData = new formdata();
  let productId = req.params.id;

  utils.createRequest('get', `${url}/api/${tenant}/${organization}/salescore/salesitems/${productId}`,requestData, true)
    .then((res) => {
        console.log(res.data);
    }).catch((err) => {
        console.log(err);
  });
});

router.get('/all', function (req, res, next) {
    let requestData = new formdata();
  
    utils.createRequest('get', `${url}/api/${tenant}/${organization}/salesCore/salesItems/extension`, requestData, true)
      .then((res) => {
          console.log(res.data);
      }).catch((err) => {
          console.log(err);
    });
  });

module.exports = router;