module.exports = {
  // * /corePatterns
  Country: require("./Country"),
  Currency: require("./Currency"),

  // * /businessCore
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
  PurchaseItem: require("./PurchaseItem"),
  PurchaseOrder: require("./PurchaseOrder"),
  SupplierParty: require("./SupplierParty"),

  // * /sales & /salesCore
  SalesInvoice: require("./SalesInvoice"),
  SalesItem: require("./SalesItem"),
  SalesOrder: require("./SalesOrder"),
  CustomerParty: require("./CustomerParty")
};
