const express = require("express");
const {
    api
} = require("../utils/endpoints");
const router = express.Router();
const {
    Brand,
    Invoice,
    Orders,
    Order_Item,
    SPItem
} = require("../models/techsinf");

router.get("/customer", function(req, res, next) {
    (api
        .get(`/${req.query.tenant}/${req.query.organization}/purchases/orders`)
        .then(response => storeOrders(response.data, res))
        .catch(error => res.send(error))).then(getAllOrdersCustomer(res));

    /*api
      .get(`/${tenant}/${organization}/purchasesCore/purchasesItems`)
      .then(response => res.send(response.data))
      .catch(error => res.send(error));*/
});

const storeOrders = (orders, res) => {
    let subscription_id = '1';
    for (let id in orders) {
        let purchase_order_uuid = orders[id].id.replace(/-/g, "");

        if (orders[id].isDeleted != false || orders[id].serie != "2019")
            continue;

        Orders.find(purchase_order_uuid)
            .then(response => {
                if (response === null) {
                    Orders.create({
                            subscription_id,
                            purchase_order_uuid: purchase_order_uuid
                        })
                        .then(response => {
                            let order_id = response.order_id;

                            for (id2 in orders[id].documentLines) {
                                let item = orders[id].documentLines[id2];

                                let quantity = item.quantity;
                                let unit_price = item.unitPrice.amount;

                                SPItem.salesItem(item.purchasesItem)
                                    .then(response => {
                                        let sp_item_id = response.sp_item_id;

                                        Order_Item.create({
                                            order_id,
                                            sp_item_id,
                                            quantity,
                                            unit_price
                                        })
                                    })
                                    .catch(error => {
                                        res.send(error);
                                    });

                            }
                        })
                        .catch(error => {
                            console.log(error);
                            res.send(error);
                        });
                }
            })
            .catch(error => {
                console.log(error);
                res.send(error);
            })
    }
}

const getAllOrdersCustomer = (res) => {
    Orders.allOrdersCustomer()
        .then(response => {
            res.send(response)
        })
        .catch(error => console.log(error));
}

router.get("/supplier", function(req, res, next) {
    (api
        .get(`/${req.query.tenant}/${req.query.organization}/billing/invoices`)
        .then(response => {
            storeInvoices(response.data)
        })
        .catch(error => res.send(error))).then(getAllOrdersSupplier(res));

    api
        .get(`/${req.query.tenant}/${req.query.organization}/businesscore/brands`)
        .then(response => storeBrands(response.data))
        .catch(error => console.log(error));

    /*api
      .get(`/${tenant}/${organization}/salescore/salesitems`)
      .then(response => res.send(response.data))
      .catch(error => res.send(error));*/
});

const storeInvoices = (invoices) => {
    let order_id = '1';
    for (let id in invoices) {
        let sales_invoice_uuid = invoices[id].id.replace(/-/g, "");
        Invoice.find(sales_invoice_uuid)
            .then(response => {
                if (response === null) {
                    Invoice.create({
                            order_id,
                            sales_invoice_uuid: sales_invoice_uuid
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

const storeBrands = (brands) => {
    let supplier_id = '2';
    for (let id in brands) {
        let brand_uuid = brands[id].id.replace(/-/g, "");
        let brand_name = brands[id].brandKey;

        Brand.find(brand_uuid)
            .then(response => {
                if (response === null) {
                    Brand.create({
                            supplier_id,
                            brand_uuid: brand_uuid,
                            brand_name
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

const getAllOrdersSupplier = (res) => {
    Orders.allOrdersSupplier()
        .then(response => {
            res.send(response)
        })
        .catch(error => console.log(error));
}

module.exports = router;