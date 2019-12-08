const express = require("express");
const { api } = require("../utils/endpoints");
const pool = require("../database");
const { requestToken } = require("../utils/token");
const { routeMap, validate } = require("../models");

// test on A
const tenant = process.env.A_TENANT;
const organization = process.env.A_ORGANIZATION;

const router = express.Router();

/**
 * Send a GET request to any Primavera endpoint with any query parameters.
 */
router.get("/get/*", function(req, res, next) {
  const url = req.params[0];
  api
    .get(`/${tenant}/${organization}/${url}`, { params: req.query })
    .then(response => res.send(response.data))
    .catch(error => res.send(error));
});

/**
 * Send a GET request to any Primavera endpoints with any query parameters.
 * Validate the results against the Joi models.
 */
router.get("/joi/*", function(req, res, next) {
  const url = req.params[0];
  const validator = routeMap["/" + url];
  if (!validator) {
    return res.send("Invalid URL: " + url);
  }
  api
    .get(`/${tenant}/${organization}/${url}`, { params: req.query })
    .then(response =>
      res.send({ ...validate(schema, response), ...response.data })
    )
    .catch(next);
});

/**
 * Validate all endpoints against the Joi models.
 */
router.get("/check", function(req, res, next) {
  const promises = Object.keys(routeMap).map(url =>
    api
      .get(`/${tenant}/${organization}${url}`, {
        params: { $inlinecount: "allpages", ...req.query }
      })
      .then(response => ({
        url,
        ...validate(routeMap[url], response)
      }))
      .catch(err => console.log(err))
  );
  Promise.all(promises)
    .then(all =>
      res.send({
        ALL_OK: all.every(item => item.ok),
        all
      })
    )
    .catch(next);
});

router.get("/post/sales/orders", function(req, res, next) {
  api
    .post(`/${tenant}/${organization}/sales/orders`, {
      company: "DEFAULT",
      buyerCustomerParty: "LIMA",
      // deliveryTerm: "CORREIO",
      documentLines: [
        {
          salesItem: "CTPLANTAS",
          quantity: 3
        },
        {
          salesItem: "BQROSAS",
          quantity: 7
        },
        {
          salesItem: "JRJARROS",
          quantity: 10
        }
      ]
    })
    .then(response => res.send(response.data))
    .catch(error => res.send(error));
});

/**
 * Database SELECT
 */
router.get("/db/test", function(req, res, next) {
  pool.query("SELECT * FROM test", (err, results) => {
    if (err) throw err;
    const { rows, rowCount } = results;
    res.status(200).json({ rows, rowCount });
  });
});

/**
 * Auth POST /connect/token
 */
router.get("/token", function(req, res, next) {
  requestToken()
    .then(response => res.send(response.data))
    .catch(error => res.send(error));
});

/**
 * Primavera POST /invoiceReceipt/invoices
 */
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
