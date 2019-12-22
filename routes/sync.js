const express = require("express");
const { api } = require("../utils/endpoints");
const SyncService = require("../services/SyncService");
const {
  Brand,
  Customer,
  Invoice,
  Orders,
  Order_Item,
  SPItem,
  Subscription
} = require("../models/techsinf");

const router = express.Router();

router.get("/customer", async function(req, res, next) {
  await api
    .get(`/${req.query.tenant}/${req.query.organization}/purchases/orders`)
    .then(response =>
      storeOrders(req.query.tenant, req.query.organization, response.data, res)
    )
    .catch(error => res.send(error));

  await getAllOrdersCustomer(res);

  /*api
    .get(`/${tenant}/${organization}/purchasesCore/purchasesItems`)
    .then(response => res.send(response.data))
    .catch(error => res.send(error));*/
});

const storeOrders = (tenant, organization, orders, res) => {
  for (let id in orders) {
    if (orders[id].isDeleted != false || orders[id].serie != "2019") continue;

    let purchase_order_uuid = orders[id].id.replace(/-/g, "");
    let company_name = orders[id].company;
    let total = orders[id].grossValue.amount;
    let order_createdat = orders[id].createdOn;

    Orders.findByPurchaseUUID(purchase_order_uuid)
      .then(response => {
        if (response === null) {
          Customer.find({
            tenant,
            organization,
            company_name
          }).then(response => {
            let customer_id = response.customer_id;
            let supplier_id = "2";

            Orders.create({
              customer_id,
              supplier_id,
              purchase_order_uuid: purchase_order_uuid,
              total,
              order_createdat
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
                      }).catch(error => console.log(error));
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
          });
        }
      })
      .catch(error => {
        console.log(error);
        res.send(error);
      });
  }
};

const getAllOrdersCustomer = res => {
  Orders.allOrdersCustomer()
    .then(response => {
      res.send(response);
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

const storeBrands = brands => {
  let supplier_id = "2";
  for (let id in brands) {
    let brand_uuid = brands[id].id.replace(/-/g, "");
    let brand_name = brands[id].brandKey;
    let brand_createdat = brands[id].createdOn;

    Brand.findSupplierName({
      supplier_id,
      brand_name,
      brand_createdat
    })
      .then(response => {
        if (response === null) {
          Brand.create({
            supplier_id,
            brand_uuid: brand_uuid,
            brand_name,
            brand_createdat
          }).catch(error => console.log(error));
        }
      })
      .catch(error => {
        console.log(error);
      });
  }
};

const getAllOrdersSupplier = res => {
  Orders.allOrdersSupplier()
    .then(response => {
      res.send(response);
    })
    .catch(error => console.log(error));
};

module.exports = router;
