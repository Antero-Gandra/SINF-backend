const express = require("express");
const router = express.Router();
const {
  Brand,
  Customer,
  SecretRegistry,
  Subscription
} = require("../models/techsinf");

router.get("/get/all/customer/:id", function(req, res, next) {
  let customerId = req.params.id;

});

router.get("/get/all/supplier/:id", function(req, res, next) {
  let supplierId = req.params.id;

  Brand.allSupplier(supplierId)
    .then(response => {
      res.send(response);
    })
    .catch(error => res.send(error));
});

module.exports = router;