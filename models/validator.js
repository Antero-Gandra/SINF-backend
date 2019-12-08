const {
  Country,
  Currency,
  Item,
  Party,
  ItemTaxSchema,
  PartyTaxSchema,
  PaymentMethod,
  PaymentTerm,
  PurchaseInvoice,
  PurchaseItem,
  PurchaseOrder,
  SalesInvoice,
  SalesItem,
  SalesOrder
} = require("./primavera/All");

function validate(schema, response, res, next) {
  const data = response.data;
  const items = "items" in data ? data.items : data;
  const errors = {};
  let checked = 0;
  for (key in items) {
    const { error } = schema.validate(items[key]);
    if (error) errors[key] = error;
    ++checked;
  }
  const ok = Object.keys(errors).length === 0;
  return res.send({ ok, checked, ...data, errors });
}

const routeMap = {
  "/corePatterns/countries/odata": Country,
  "/corePatterns/currencies/odata": Currency,
  "/businessCore/items/odata": Item,
  "/businessCore/parties/odata": Party,
  "/taxesCore/itemTaxSchemas/odata": ItemTaxSchema,
  "/taxesCore/partyTaxSchemas/odata": PartyTaxSchema,
  "/financialCore/paymentMethods": PaymentMethod,
  "/financialCore/paymentTerms": PaymentTerm,
  "/invoiceReceipt/invoices/odata": PurchaseInvoice,
  "/purchasesCore/purchasesItems/extension/odata": PurchaseItem,
  "/purchases/orders/odata": PurchaseOrder,
  "/billing/invoices/odata": SalesInvoice,
  "/salesCore/salesItems/extension/odata": SalesItem,
  "/sales/orders/odata": SalesOrder
};

module.exports = {
  validate,
  routeMap
};
