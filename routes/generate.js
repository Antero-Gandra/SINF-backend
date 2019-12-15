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

router.post("/salesOrder", function(req, res, next) {
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

router.post("/purchaseInvoice", function(req, res, next) {
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

          orderID = response.order_id;
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

module.exports = router;