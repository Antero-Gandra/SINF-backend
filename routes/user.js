const express = require("express");
const router = express.Router();
const { Customer, Supplier } = require("../models/techsinf");

router.post("/customer/add", function(req, res, next) {
  let tenant = req.body.tenant;
  let organization = req.body.organization;
  let company = req.body.company;

  Customer.find({ tenant, organization })
    .then(response => {
      if (response === null) {
        Customer.create({ tenant, organization, company_uuid: company })
          .then(response => {
            console.log(response);
          })
          .catch(error => {
            console.log("entering catch");
            res.send(error);
          });
      } else {
        res.send("User already created ..");
      }
    })
    .catch(error => res.send(error));
});

router.post("/supplier/add", function(req, res, next) {
  let tenant = req.body.tenant;
  let organization = req.body.organization;
  let company = req.body.company;
});

module.exports = router;
