module.exports = {
  Joi: require("@hapi/joi"),

  // * /corePatterns
  Country: require("./Country"),
  Currency: require("./Currency"),

  // * /businessCore
  Brand: require("./Brand"),
  Item: require("./Item"),
  Party: require("./Party"),

  // * /financialCore
  PaymentMethod: require("./PaymentMethod"),
  PaymentTerm: require("./PaymentTerm"),

  // * /taxesCore
  ItemTaxSchema: require("./ItemTaxSchema"),
  PartyTaxSchema: require("./PartyTaxSchema"),

  // * /purchases  &  /purchasesCore
  PurchaseInvoice: require("./PurchaseInvoice"),
  PurchaseInvoiceLine: require("./PurchaseInvoiceLine"),
  PurchaseItem: require("./PurchaseItem"),
  PurchaseOrder: require("./PurchaseOrder"),
  PurchaseOrderLine: require("./PurchaseOrderLine"),
  SupplierParty: require("./SupplierParty"),

  // * /sales & /salesCore
  SalesInvoice: require("./SalesInvoice"),
  SalesInvoiceLine: require("./SalesInvoiceLine"),
  SalesItem: require("./SalesItem"),
  SalesOrder: require("./SalesOrder"),
  SalesOrderLine: require("./SalesOrderLine"),
  CustomerParty: require("./CustomerParty"),
};
