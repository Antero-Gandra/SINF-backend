const express = require("express");
const router = express.Router();
const { Subscription, Customer, Supplier } = require("../models/techsinf");

router.get("/get/all/customer", function(req, res, next) {

    let tenant = req.query.tenant;
    let organization = req.query.organization;
    let company_name = req.query.company;
    
    Customer.find({ tenant, organization, company_name }).then(response =>{
        if(response !== null){
            let userId = response.customer_id;

            Subscription.allCustomer(userId).then(response => {
                res.send(response);
            })
        }

        else{
            res.send({msg:"Customer not found"});
        }

    })
    .catch(error => console.log(error));
});

router.get("/get/all/supplier", function(req, res, next) {
    let tenant = req.query.tenant;
    let organization = req.query.organization;
    let company_name = req.query.company;
    
    Supplier.find({ tenant, organization, company_name }).then(response =>{
        if(response !==  null){
            let userId = response.supplier_id;

            Subscription.allSupplier(userId).then(response => {
                res.send(response);
            })
        }

        else {
            res.send({msg:"Supplier not found"});
        }
    })
    .catch(error => console.log(error));
});

router.delete("/delete/:id", function(req, res, next) {
    let subscriptionId = req.params.id;

    Subscription.delete(subscriptionId)
        .then(res.send({msg: "Deleted subscription!"}))
        .catch(error => {
            console.log(error);
            res.send(error);
        })
});

router.post("/create", function(req, res, next) {
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
