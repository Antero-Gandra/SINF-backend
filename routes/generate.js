const express = require("express");
const {
  api
} = require("../utils/endpoints");
const router = express.Router();
const {
  Invoice,
  Orders,
  Order_Item,
  SecretRegistry
} = require("../models/techsinf");

router.post("/salesOrder", async function(req, res, next) {
  let order_id = req.body.orderId;

  let buyer;
  let supplierTenant
  let supplierOrganization;
  let supplierCompany;
  let documentLines = [];

  await Orders.findByOrderID(order_id)
    .then(response => {

      let stage = response.stage;

      if (stage == 'SALES_ORDER' || stage == 'SALES_INVOICE' || stage == 'PURCHASE_INVOICE') {
        res.send({
          message: 'Sales order was already generated!'
        })
        return;
      }

      buyer = response.customer_company_name;
      supplierTenant = response.supplier_tenant;
      supplierOrganization = response.supplier_organization;
      supplierCompany = response.supplier_company_name;

      Order_Item.findOrderItems(order_id)
        .then(response => {
          for (const id in response) {
            let item = response[id];

            documentLines.push({
              "salesItem": item.supplier_item,
              "quantity": item.quantity,
              "itemTaxSchema": 'ISENTO',
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
              order_id: order_id,
              sales_order_uuid: response.data
            }))
            .catch(error => console.log(error));
        })
    })
    .catch(error => res.send(error))
    .catch(error => res.send(error));

  res.send({
    message: 'Sales order generated!'
  })
});

router.post("/purchaseInvoice", async function(req, res, next) {
  let order_id = req.body.orderId;

  let seller;
  let buyerTenant
  let buyerOrganization;
  let buyerCompany;
  let documentLines = [];

  await Orders.findByOrderID(order_id)
    .then(response => {

      let stage = response.stage;

      if (stage == 'COMPLETED') {
        res.send({
          message: 'Purchase invoice was already generated!'
        })
        return;
      }

      buyerTenant = response.customer_tenant;
      buyerOrganization = response.customer_organization;
      buyerCompany = response.customer_company_name;
      seller = response.supplier_company_name;

      Order_Item.findOrderItems(order_id)
        .then(response => {
          for (const id in response) {
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
              Orders.complete(order_id);
              Invoice.setPurchase({
                order_id: order_id,
                purchase_invoice_uuid: response.data
              })
            })
            .catch(error => console.log(error));
        })

    })
    .catch(error => console.log(error))

    res.send({
      message: 'Purchase invoice generated!'
    })
});

router.post("/key", async function(req, res, next) {

  let brand_id = req.body.brandId;

  await SecretRegistry.generate(brand_id)
    .catch(error => res.send(error))

  await SecretRegistry.getLast(brand_id)
    .then(response => res.send(response))
    .catch(error => res.send(error))
});

module.exports = router;