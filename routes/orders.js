const utils = require("../utils/endpoints");

const express = require("express");
const router = express.Router();
const formdata = require("form-data");

let url = utils.url;
let tenant = utils.tenant;
let organization = utils.organization;

router.get("/purchases", function(req, res, next) {
  let requestData = new formdata();

  utils
    .createRequest(
      "get",
      `${url}/api/${tenant}/${organization}/purchases/orders`,
      requestData,
      true
    )
    .then(res => {
      console.log(res.data);
    })
    .catch(err => {
      console.log(err);
    });
});

router.get("/sales", function(req, res, next) {
  let requestData = new formdata();

  let company = "EMPY";
  let buyer = "INDIF";
  let deliveryTerm = "TRANSP";
  let documentLines = [
    {
      salesItem: "ARTIGO"
    }
  ];

  requestData = {
    company: company,
    buyerCustomerParty: buyer,
    deliveryTerm: deliveryTerm,
    documentLines: documentLines
  };

  utils
    .createRequest(
      "post",
      `${url}/api/${tenant}/${organization}/sales/orders`,
      requestData,
      true
    )
    .then(res => {
      console.log(res.data);
    })
    .catch(err => {
      console.log(err);
    });
});

module.exports = router;
