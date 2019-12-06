const utils = require("../utils/endpoints");

const express = require("express");
const router = express.Router();
const formdata = require("form-data");

let url = utils.url;
let tenant = utils.tenant;
let organization = utils.organization;

router.get("/sales", function(req, res, next) {
  let requestData = new formdata();

  utils
    .createRequest(
      "get",
      `${url}/api/${tenant}/${organization}/billing/invoices/`,
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

router.get("/purchases", function(req, res, next) {
  let requestData = new formdata();

  let documentType = "VFA";
  let company = "EMPY";
  let seller = "0001";
  let documentLines = [
    {
      PurchasesItem: "FORTNITE",
      quantity: 1
    }
  ];

  requestData = {
    documentType: documentType,
    company: company,
    sellerSupplierParty: seller,
    documentLines: documentLines
  };

  utils
    .createRequest(
      "post",
      `${url}/api/${tenant}/${organization}/invoiceReceipt/invoices/`,
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
