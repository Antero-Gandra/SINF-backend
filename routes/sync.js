const express = require("express");
const { api } = require("../utils/endpoints");
const router = express.Router();
const {
    Orders,
    Invoices
} = require("../models/techsinf");

router.get("/sync/customer", function(req, res, next) {

    let orders

    api
        .get(`/${tenant}/${organization}/purchases/orders`)
        .then(response => storeOrders(response.data))
        .catch(error => res.send(error));

    /*api
      .get(`/${tenant}/${organization}/purchasesCore/purchasesItems`)
      .then(response => res.send(response.data))
      .catch(error => res.send(error));*/
});

const storeOrders = (orders) => {
    let subscription_id = '1';
    for (let id in orders) {
        let purchase_order_uuid = orders[id].id.replace(/-/g, "");
        Orders.find(purchase_order_uuid)
            .then(response => {
                if (response === null) {
                    Orders.create({
                            subscription_id,
                            purchase_order_uuid: purchase_order_uuid
                        })
                        .then(response)
                        .catch(error => {
                            console.log(error);
                        });
                }
            })
            .catch(error => {
                console.log(error);
            })
    }
}


router.get("/sync/supplier", function(req, res, next) {
    api
        .get(`/${tenant}/${organization}/billing/invoices`)
        .then(response => {
            storeInvoices(response.data)
        })
        .catch(error => res.send(error));

    /*api
      .get(`/${tenant}/${organization}/salescore/salesitems`)
      .then(response => res.send(response.data))
      .catch(error => res.send(error));*/
});

const storeInvoices = (invoices) => {
    let order_id = '1';
    for (let id in invoices) {
        let sales_invoice_uuid = invoices[id].id.replace(/-/g, "");
        Invoice.find(purchase_order_uuid)
            .then(response => {
                if (response === null) {
                    Invoice.create({
                            order_id,
                            sales_invoice_uuid: sales_invoice_uuid
                        })
                        .then(response => {
                            console.log(response);
                        })
                        .catch(error => {
                            console.log(error);
                        });
                }
            })
            .catch(error => {
                console.log(error);
            })
    }
}

module.exports = router;