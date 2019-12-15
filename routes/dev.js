const express = require("express");
const {
    api
} = require("../utils/endpoints");
const {
    requestToken
} = require("../utils/token");
const {
    joiRouteMap,
    validate
} = require("../models/primavera/joi/validator");
const pool = require("../database");
const {
    Country,
    Currency,
    CustomerParty,
    Item,
    ItemTaxSchema
} = require("../models/primavera");
const {
    Brand,
    Customer,
    Supplier,
    Orders,
    Order_Item,
    Invoice,
    SPItem
} = require("../models/techsinf");

// test on A
const tenant = process.env.A_TENANT;
const organization = process.env.A_ORGANIZATION;

const router = express.Router();

router.get("/session/check", function(req, res, next) {
    if (req.session.counter == null) req.session.counter = 0;
    req.session.counter++;
    res.send({
        session: req.session
    });
});

/**
 * Send a GET request to any Primavera endpoint with any query parameters.
 */
router.get("/get/*", function(req, res, next) {
    const url = req.params[0];
    api
        .get(`/${tenant}/${organization}/${url}`, {
            params: req.query
        })
        .then(response => res.send(response.data))
        .catch(error => res.send(error));
});

router.get("/db/customer/create", async function(req, res, next) {
    const customer = await Customer.create({
        tenant: "227113",
        organization: "227113-0012",
        company_uuid: "14341234-5678-9876-1234-098767891234"
    });
    return res.send(customer);
});

router.get("/db/customer/delete", async function(req, res, next) {
    const customer = await Customer.find({
        tenant: "227113",
        organization: "227113-0012",
        company_uuid: "14341234-5678-9876-1234-098767891234"
    });
    if (customer == null) return res.send({
        message: "not found"
    });
    const count = await Customer.delete(customer.customer_id);
    return res.send({
        message: "Deleted if count>0",
        count,
        customer
    });
});

/**
 * Database SELECT
 */
router.get("/db/test", function(req, res, next) {
    pool.query("SELECT * FROM orders", (err, results) => {
        if (err) throw err;
        const {
            rows,
            rowCount
        } = results;
        res.status(200).json({
            rows,
            rowCount
        });
    });
});

router.post("/order/generate", function(req, res, next) {
    let order_uuid = req.body.orderId;

    let orderID;
    let buyer;
    let supplierTenant
    let supplierOrganization;
    let supplierCompany;
    let documentLines = [];

    Orders.find(order_uuid)
        .then(response =>
            Orders.find(order_uuid)
            .then(response => {
                orderID = response.order_id;
                buyer = response.customer_company_name;
                supplierTenant = response.supplier_tenant;
                supplierOrganization = response.supplier_organization;
                supplierCompany = response.supplier_company_name;

                Order_Item.findOrderItems(orderID)
                    .then(response => {
                        for (id in response) {
                            let item = response[id];

                            documentLines.push({
                                "salesItem": item.supplier_item,
                                "quantity": item.quantity,
                                "unitPrice": {
                                    "amount": item.unit_price,
                                }
                            })
                        }

                        api
                            .post(`/${supplierTenant}/${supplierOrganization}/sales/orders`, {
                                company: supplierCompany,
                                buyerCustomerParty: '0001',
                                deliveryTerm: 'TRANSP',
                                serie: '2019',
                                documentLines: documentLines
                            })
                            .then(response => Orders.accept({
                                order_id: orderID,
                                sales_order_uuid: response.data
                            }))
                            .catch(error => console.log(error));
                    })
            })
            .catch(error => res.send(error))
        )
        .catch(error => res.send(error));
});

router.post("/invoice/generate", function(req, res, next) {
    let order_uuid = req.body.orderId;

    let orderID;
    let seller;
    let buyerTenant
    let buyerOrganization;
    let buyerCompany;
    let documentLines = [];

    Orders.find(order_uuid)
        .then(response => {
            Orders.find(order_uuid)
                .then(response => {

                    orderID = response.order_id,
                        buyerTenant = response.customer_tenant;
                    buyerOrganization = response.customer_organization;
                    buyerCompany = response.customer_company_name;
                    seller = response.supplier_company_name;

                    Order_Item.findOrderItems(orderID)
                        .then(response => {
                            for (id in response) {
                                let item = response[id];

                                documentLines.push({
                                    "purchasesItem": item.customer_item,
                                    "quantity": item.quantity,
                                    "unitPrice": {
                                        "amount": item.unit_price,
                                    }
                                })
                            }

                            api
                                .post(`/${buyerTenant}/${buyerOrganization}/invoiceReceipt/invoices`, {
                                    documentType: 'VFA',
                                    company: buyerCompany,
                                    serie: '2019',
                                    sellerSupplierParty: '0001',
                                    documentLines: documentLines
                                })
                                .then(response => {
                                    Orders.complete(orderID);
                                    Invoice.setPurchase({
                                        order_id: orderID,
                                        purchase_invoice_uuid: response.data
                                    })
                                })
                                .catch(error => console.log(error));
                        })

                })
        })
        .catch(error => console.log(error))
});


/**
 * Send a GET request to any Primavera endpoint with any query parameters.
 * Validate the results against the Joi schemas.
 */
router.get("/joi/*", function(req, res, next) {
    const url = req.params[0];
    const validator = joiRouteMap["/" + url];
    if (!validator) {
        return res.send("Invalid URL: " + url);
    }
    api
        .get(`/${tenant}/${organization}/${url}`, {
            params: req.query
        })
        .then(response =>
            res.send({
                ...validate(schema, response),
                ...response.data
            })
        )
        .catch(next);
});

/**
 * Validate all endpoints against the Joi schemas.
 */
router.get("/check", function(req, res, next) {
    const promises = Object.keys(joiRouteMap).map(url =>
        api
        .get(`/${tenant}/${organization}${url}`, {
            params: {
                $inlinecount: "allpages",
                ...req.query
            }
        })
        .then(response => ({
            url,
            ...validate(joiRouteMap[url], response)
        }))
        .catch(err => console.log(err))
    );
    Promise.all(promises)
        .then(all =>
            res.send({
                ALL_OK: all.every(item => item.ok),
                all
            })
        )
        .catch(next);
});

/**
 * Test Primavera models.
 */
router.get("/models", async function(req, res, next) {
    const sub = {
        tenant,
        organization
    };

    try {
        const country = await Country(sub).get("AM");
        const currency = await Currency(sub).get("EUR");
        const customerParty = await CustomerParty(sub).get("ALCAD");
        const item = await Item(sub).get("PORTES");
        const itemTaxSchema = await ItemTaxSchema(sub).get("IVA-TI");
        res.send({
            country,
            currency,
            customerParty,
            item,
            itemTaxSchema
        });
    } catch (error) {
        res.send({
            error
        });
    }
});

/**
 *
 */

router.get("/post/sales/orders", function(req, res, next) {
    api
        .post(`/${tenant}/${organization}/sales/orders`, {
            company: "DEFAULT",
            buyerCustomerParty: "LIMA",
            // deliveryTerm: "CORREIO",
            documentLines: [{
                    salesItem: "CTPLANTAS",
                    quantity: 3
                },
                {
                    salesItem: "BQROSAS",
                    quantity: 7
                },
                {
                    salesItem: "JRJARROS",
                    quantity: 10
                }
            ]
        })
        .then(response => res.send(response.data))
        .catch(error => res.send(error));
});

/**
 * Auth POST /connect/token
 */
router.get("/token", function(req, res, next) {
    requestToken()
        .then(response => res.send(response.data))
        .catch(error => res.send(error));
});

/**
 * Primavera POST /invoiceReceipt/invoices
 */
router.get("/post/invoiceReceipt/invoices", function(req, res, next) {
    const documentType = "VFA";
    const company = "EMPY";
    const seller = "0001";
    const documentLines = [{
        PurchasesItem: "FORTNITE",
        quantity: 90
    }];

    requestData = {
        documentType: documentType,
        company: company,
        sellerSupplierParty: seller,
        documentLines: documentLines
    };

    api
        .post(`/${tenant}/${organization}/invoiceReceipt/invoices/`, requestData)
        .then(response => res.send(response.data))
        .catch(error => res.send(error));
});

module.exports = router;