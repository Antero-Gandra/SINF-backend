const express = require("express");
const router = express.Router();
const { Subscription, Customer, Supplier } = require("../models/techsinf");

router.get("/get/all/customer", function(req, res, next) {

    let tenant = req.query.tenant;
    let organization = req.query.organization;
    let company_uuid = req.query.company;
    
    Customer.find({ tenant, organization, company_uuid }).then(response =>{
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
    let company_uuid = req.query.company;
    
    Supplier.find({ tenant, organization, company_uuid }).then(response =>{
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
});

module.exports = router;
