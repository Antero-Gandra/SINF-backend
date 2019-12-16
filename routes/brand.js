const express = require("express");
const router = express.Router();
const {
  Brand,
  Customer,
  SecretRegistry,
  Subscription
} = require("../models/techsinf");
const SyncService = require("../services/SyncService");

router.get("/get/all/customer/:id", function(req, res, next) {
  let customerId = req.params.id;

});

router.get("/get/all/supplier/:id", function(req, res, next) {
  let supplierId = req.params.id;
  let ten = req.query.tenant;
  let org = req.query.organization;

  SyncService.brands({user_id: supplierId, tenant: ten, organization: org})
    .then(data => {
      console.log(data);
      res.send(response)
    })
    .catch(error => res.send(error));
});

router.post("/subscribe", function(req, res, next) {
  let secretKey = req.body.secretKey;
  let tenant = req.body.tenant;
  let organization = req.body.organization;
  let company_name = req.body.company;

  Customer.find({
      tenant,
      organization,
      company_name
    })
    .then(response => {
        let customer_id = response.customer_id

        SecretRegistry.find(secretKey)
          .then(response => {
            let brand_id = response.brand_id;

            Subscription.create({
              brand_id,
              customer_id
            })
          })
          .catch(error => res.send(error))
    })
.catch(error => res.send(error))
});


module.exports = router;