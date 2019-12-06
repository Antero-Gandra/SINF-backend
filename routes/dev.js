const express = require("express");
const { api } = require("../utils/endpoints");
const { requestToken } = require("../utils/token");

// test on A
const tenant = process.env.A_TENANT;
const organization = process.env.A_ORGANIZATION;

const router = express.Router();

router.get("/get/*", function(req, res, next) {
  console.log(req.params[0]);
  res.end();
});

router.get("/token", function(req, res, next) {
  requestToken()
    .then(response => res.send(response.data))
    .catch(error => res.send(error));
});

router.get("/post/sales/orders", function(req, res, next) {
  api
    .post(`/${tenant}/${organization}/sales/orders`, {
      company: "EMPY",
      buyerCustomerParty: "INDIF",
      deliveryTerm: "TRANSP",
      documentLines: [{ salesItem: "ARTIGO", quantity: 73, unit: "UN" }]
    })
    .then(response => res.send(response.data))
    .catch(error => res.send(error));
});

router.get("/post/invoiceReceipt/invoices", function(req, res, next) {
  const documentType = "VFA";
  const company = "EMPY";
  const seller = "0001";
  const documentLines = [
    {
      PurchasesItem: "FORTNITE",
      quantity: 90
    }
  ];

  requestData = {
    documentType: documentType,
    company: company,
    sellerSupplierParty: seller,
    documentLines: documentLines
  };

  api
    .post(`/${tenant}/${organization}/invoiceReceipt/invoices/`, requestData)
    .then(response => res.send(response.data))
    .catch(error => res.send(error));
});

module.exports = router;
