const express = require("express");
const { api } = require("../utils/endpoints");
const router = express.Router();
const { Customer, Supplier } = require("../models/techsinf");

router.post("/customer/add", function(req, res, next) {
  let tenant = req.body.tenant;
  let organization = req.body.organization;
  let company_uuid = req.body.company;

  Customer.find({ tenant, organization, company_uuid })
    .then(response => {
      console.log("found");
      if (response === null) {
        console.log("success, created new user");
            api
            .get(`/${tenant}/${organization}/corepatterns/companies/${company_uuid}`)
            .then(response =>         
              {
                Customer.create({ tenant, organization, company_uuid: company_uuid })
                res.send({message: "Register successful"});
              })
            .catch(error => 
              {
                console.log(error);
                res.send(error);
              });
      }
      else {
        console.log("success, found existing user");
        res.send({message: "Login successful"});
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
    console.log("found");
    if (response === null) {
      console.log("success, created new user");
          api
          .get(`/${tenant}/${organization}/corepatterns/companies/${company_uuid}`)
          .then(response =>         
            {
              Supplier.create({ tenant, organization, company_uuid: company_uuid })
              res.send({message: "Register successful"});
            })
          .catch(error => 
            {
              console.log(error);
              res.send(error);
            });
    }
    else {
      console.log("success, found existing user");
      res.send({message: "Login successful"});
    }
  })
  .catch(error => {
    console.log("find error");
    res.send(error);
  });
});

module.exports = router;
