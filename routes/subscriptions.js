const express = require("express");
const router = express.Router();
const { Subscription, Customer, Supplier } = require("../models/techsinf");

router.get("/get/all/customer", function(req, res, next) {

    let tenant = req.query.tenant;
    let organization = req.query.organization;
    let company_uuid = req.query.company;
    
    Customer.find({ tenant, organization, company_uuid }).then(response =>{
        let userId = response.customer_id;

        Subscription.allCustomer(userId).then(response => {
            res.send(response);
        })
    })
});

router.get("/get/all/supplier", function(req, res, next) {
    Subscription.allSupplier(req.query.supplierId).then(response => {
        res.send(response);
    })
});

router.delete("/delete/:id", function(req, res, next) {
    let subscriptionId = req.params.id;
});

module.exports = router;
