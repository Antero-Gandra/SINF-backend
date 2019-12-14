const express = require("express");
const { api } = require("../utils/endpoints");
const { requestToken } = require("../utils/token");
const { joiRouteMap, validate } = require("../models/primavera/joi/validator");
const pool = require("../database");
const {
  Country,
  Currency,
  CustomerParty,
  Item,
  ItemTaxSchema
} = require("../models/primavera");
const { Brand, Customer, Supplier, Orders, Invoice } = require("../models/techsinf");

// test on A
const tenant = process.env.A_TENANT;
const organization = process.env.A_ORGANIZATION;

const router = express.Router();

router.get("/session/check", function(req, res, next) {
  if (req.session.counter == null) req.session.counter = 0;
  req.session.counter++;
  res.send({ session: req.session });
});

/**
 * Send a GET request to any Primavera endpoint with any query parameters.
 */
router.get("/get/*", function(req, res, next) {
  const url = req.params[0];
  api
    .get(`/${tenant}/${organization}/${url}`, { params: req.query })
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
  if (customer == null) return res.send({ message: "not found" });
  const count = await Customer.delete(customer.customer_id);
  return res.send({ message: "Deleted if count>0", count, customer });
});

/**
 * Database SELECT
 */
router.get("/db/test", function(req, res, next) {
  pool.query("SELECT * FROM orders", (err, results) => {
    if (err) throw err;
    const { rows, rowCount } = results;
    res.status(200).json({ rows, rowCount });
  });
}); 

router.get("/sync/customer", function(req, res, next) {
  (api
    .get(`/${req.query.tenant}/${req.query.organization}/purchases/orders`)
    .then(response => storeOrders(response.data, res))
    .catch(error => res.send(error))).then(getAllOrdersCustomer(res));

  /*api
    .get(`/${tenant}/${organization}/purchasesCore/purchasesItems`)
    .then(response => res.send(response.data))
    .catch(error => res.send(error));*/
});

const getAllOrdersCustomer = (res) =>
{
  Orders.allOrdersCustomer()
    .then(response => {
      console.log(response);
      res.send(response)
    })
    .catch(error => console.log(error));
}

const getAllOrdersSupplier = (res) =>
{
  Orders.allOrdersSupplier()
    .then(response => {res.send(response)})
    .catch(error => console.log(error));
}

const storeOrders = (orders, res) =>
{
  let subscription_id = '1';
  for(let id in orders)
  {
    let purchase_order_uuid = orders[id].id.replace(/-/g, "");
    Orders.find(purchase_order_uuid)
    .then(response => {
        if(response === null) {
          Orders.create({ subscription_id, purchase_order_uuid: purchase_order_uuid })
            .then(response => {
              console.log("Adding to database");
              console.log(response);
            }) 
            .catch(error => {
              console.log(error);
              res.send(error);
            });
        }

        else {
          console.log("Found existing order!");
          console.log(response);
        }
    })
    .catch(error => {
      console.log(error);
      res.send(error);
    })
  }
}

router.get("/sync/supplier", function(req, res, next) {
  (api
    .get(`/${req.query.tenant}/${req.query.organization}/billing/invoices`)
    .then(response => {storeInvoices(response.data)})
    .catch(error => res.send(error))).then(getAllOrdersSupplier(res));

  (api
    .get(`/${req.query.tenant}/${req.query.organization}/businesscore/brands`)
    .then(response => storeBrands(response.data))
    .catch(error => console.log(error)));

  /*api
    .get(`/${tenant}/${organization}/salescore/salesitems`)
    .then(response => res.send(response.data))
    .catch(error => res.send(error));*/
});

const storeInvoices = (invoices) =>
{
  let order_id = '1';
  for(let id in invoices)
  {
    let sales_invoice_uuid = invoices[id].id.replace(/-/g, "");
     Invoice.find(sales_invoice_uuid)
     .then(response => {
         if(response === null) {
          Invoice.create({ order_id, sales_invoice_uuid: sales_invoice_uuid })
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

const storeBrands = (brands) =>
{
  let supplier_id = '2';
  for(let id in brands)
  {
    let brand_uuid = brands[id].id.replace(/-/g, "");
     Brand.find(brand_uuid)
     .then(response => {
         if(response === null) {
          Brand.create({ supplier_id, brand_uuid: brand_uuid })
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
    .get(`/${tenant}/${organization}/${url}`, { params: req.query })
    .then(response =>
      res.send({ ...validate(schema, response), ...response.data })
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
        params: { $inlinecount: "allpages", ...req.query }
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
  const sub = { tenant, organization };

  try {
    const country = await Country(sub).get("AM");
    const currency = await Currency(sub).get("EUR");
    const customerParty = await CustomerParty(sub).get("ALCAD");
    const item = await Item(sub).get("PORTES");
    const itemTaxSchema = await ItemTaxSchema(sub).get("IVA-TI");
    res.send({ country, currency, customerParty, item, itemTaxSchema });
  } catch (error) {
    res.send({ error });
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
      documentLines: [
        {
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
  const documentLines = [
    {
      PurchasesItem: "FORTNITE",
      quantity: 90
    }
  ];

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
