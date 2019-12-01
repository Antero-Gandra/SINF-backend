const utils = require('../utils/utils');

const express = require("express");
const router = express.Router();
const formdata = require('form-data');

let url = utils.url;
let tenant = utils.tenant;
let organization = utils.organization;

router.get('/sales', function (req, res, next) {
  let requestData = new formdata();

  utils.createRequest('get', `${url}/api/${tenant}/${organization}/billing/invoices/`,requestData, true)
    .then((res) => {
        console.log(res.data);
    }).catch((err) => {
        console.log(err);
  });
});

module.exports = router;
