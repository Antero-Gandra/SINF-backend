const express = require("express");
const router = express.Router();
const { Customer, Supplier } = require("../models/techsinf");

router.post("/customer/add", function(req, res, next) {
  let tenant = req.body.tenant;
  let organization = req.body.organization;
  let company_uuid = req.body.company;

  Customer.find({ tenant, organization, company_uuid })
    .then(response => {
      if (response === null) {
        Customer.create({ tenant, organization, company_uuid: company_uuid })
          .then(response => {
            console.log("success, created new user");
            console.log(response);
            res.send(response);
          })
          .catch(error => {
            console.log("create error");
            res.send(error);
          });
      } else {
        console.log("success, found existing user");
        res.send({ body:"User already created .." });
      }
    })
    .catch(error => {
      console.log("find error");
      res.send(error);
    });
});

router.post("/supplier/add", function(req, res, next) {
  let tenant = req.body.tenant;
  let organization = req.body.organization;
  let company_uuid = req.body.company;

  Supplier.find({ tenant, organization, company_uuid })
  .then(response => {
    if (response === null) {
      Supplier.create({ tenant, organization, company_uuid: company_uuid })
        .then(response => {
          console.log("success, created new user");
          console.log(response);
          res.send(response);
        })
        .catch(error => {
          console.log("create error");
          res.send(error);
        });
    } else {
      console.log("success, found existing user");
      res.send({ body:"User already created .." });
    }
  })
  .catch(error => {
    console.log("find error");
    res.send(error);
  });
});

module.exports = router;
