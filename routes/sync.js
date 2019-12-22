const express = require("express");
const { api } = require("../utils/endpoints");
const SyncService = require("../services/SyncService");
const { Brand, Invoice, Orders } = require("../models/techsinf");
const APIPurchaseOrder = require("../models/primavera/PurchaseOrder");

const router = express.Router();

const CUSTOMER_ID = 1,
  SUPPLIER_ID = 2;

router.get("/customer", async function(req, res, next) {
  const customer = {
    user_id: 1,
    tenant: req.query.tenant,
    organization: req.query.organization,
    company_uuid: "32652d3e-a1ad-4097-8dd6-b78f7503af6d"
  };

  const orders = await APIPurchaseOrder(customer).all();
  storeOrders(customer, orders);
  getAllOrdersCustomer(res);

  /*api
    .get(`/${tenant}/${organization}/purchasesCore/purchasesItems`)
    .then(response => res.send(response.data))
    .catch(error => res.send(error));*/
});

const storeOrders = (customer, purchaseOrders) => {
  const customer_id = customer.user_id;

  for (const po of purchaseOrders) {
    if (po.isDeleted != false || po.serie != "2019") continue;

    const purchase_order_uuid = po.id.replace(/-/g, "");
    const total = po.grossValue.amount;
    const order_createdat = po.createdOn;

    Orders.findByPurchaseUUID(purchase_order_uuid)
      .then(order => {
        if (order !== null) return;
        const supplier_id = "2";

        Orders.create({
          customer_id,
          supplier_id,
          purchase_order_uuid,
          total,
          order_createdat
        });
      })
      .catch(console.error);
  }
};

const getAllOrdersCustomer = res => {
  Orders.allCustomer(CUSTOMER_ID) // HC
    .then(orders => {
      console.log("ALL ORDERS", orders);
      res.send(orders);
    })
    .catch(error => console.log(error));
};

router.get("/supplier", function(req, res, next) {
  const supplier = {
    user_id: 2,
    tenant: req.query.tenant,
    organization: req.query.organization,
    company_uuid: "5210709b-9cd7-4d65-960b-c35279faab33"
  };

  api
    .get(`/${req.query.tenant}/${req.query.organization}/billing/invoices`)
    .then(response => storeInvoices(response.data))
    .catch(error => console.error(error));

  getAllOrdersSupplier(res);

  SyncService.brands(supplier);
});

const storeInvoices = invoices => {
  for (let id in invoices) {
    let sales_invoice_uuid = invoices[id].id.replace(/-/g, "");
    let invoice_createdat = invoices[id].createdOn;

    Invoice.find(sales_invoice_uuid)
      .then(response => {
        if (response === null) {
          let remarks = invoices[id].remarks;

          if (remarks != null) {
            remarks = remarks.substring(remarks.indexOf("ORD-") + 4);

            let order_id;

            let i = 0;

            let char;
            do {
              char = remarks.charAt(i);
              i++;
            } while (char >= "0" && char <= "9");

            order_id = remarks.substring(0, i - 1);

            Orders.get(order_id)
              .then(response => {
                if (response != null) {
                  Invoice.create({
                    order_id,
                    sales_invoice_uuid: sales_invoice_uuid,
                    invoice_createdat
                  }).catch(error => {
                    console.log(error);
                  });

                  Orders.receiveSalesInvoice(order_id);
                }
              })
              .catch(error => {
                console.log(error);
              });
          }
        }
      })
      .catch(error => {
        console.log(error);
      });
  }
};

const getAllOrdersSupplier = res => {
  Orders.allSupplier(SUPPLIER_ID) // HC
    .then(response => {
      res.send(response);
    })
    .catch(error => console.log(error));
};

module.exports = router;
