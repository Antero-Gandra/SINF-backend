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
  SupplierParty,
  SalesInvoice,
  SalesItem,
  SalesOrder,
  CustomerParty
} = require("./primavera/All");

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
  "/purchasesCore/purchasesItems/odata": PurchaseItem.extended,
  "/purchases/orders/odata": PurchaseOrder,
  "/purchasesCore/supplierParties/extension/odata": SupplierParty,
  "/purchasesCore/supplierParties/odata": SupplierParty.extended,
  "/billing/invoices/odata": SalesInvoice,
  "/salesCore/salesItems/extension/odata": SalesItem,
  "/salesCore/salesItems/odata": SalesItem.extended,
  "/sales/orders/odata": SalesOrder,
  "/salesCore/customerParties/extension/odata": CustomerParty,
  "/salesCore/customerParties/odata": CustomerParty.extended
};

function validate(schema, response) {
  const data = response.data;
  const items = "items" in data ? data.items : data;
  const errors = [];
  const num = { good: 0, bad: 0 };
  for (key in items) {
    const { error } = schema.validate(items[key]);
    if (error) {
      errors.push(error.details[0]);
      ++num.bad;
    } else {
      ++num.good;
    }
  }
  return { ok: num.bad === 0, num, errors };
}

module.exports = {
  validate,
  routeMap
};
