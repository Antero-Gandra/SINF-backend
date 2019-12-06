const express = require("express");
const { api } = require("../utils/endpoints");
const { requestToken } = require("../utils/token");

// test on A
const tenant = process.env.A_TENANT;
const organization = process.env.A_ORGANIZATION;

const router = express.Router();

router.get("/purchases", function(req, res, next) {
  api
    .get(`/${tenant}/${organization}/purchases/orders`)
    .then(response => res.send(response.data))
    .catch(error => res.send(error));
});

router.get("/sales", function(req, res, next) {
  api
    .get(`/${tenant}/${organization}/sales/orders`)
    .then(response => res.send(response.data))
    .catch(error => res.send(error));
});

router.get("/token", function(req, res, next) {
  requestToken()
    .then(response => res.send(response.data))
    .catch(error => res.send(error));
});

router.get("/post/sales", function(req, res, next) {
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

module.exports = router;
