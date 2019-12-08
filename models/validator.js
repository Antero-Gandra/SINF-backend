const Joi = require("@hapi/joi");

// note: prettier is disabled for this file

// * Auxiliary validators

const Amount = Joi.number().min(0);
const Decimal = Joi.number().min(0);
const SeriesNumber = Joi.number().positive();
const DecimalPlaces = Joi.number().integer().min(0);

const AmountObject = Joi.object({
  amount: Amount,
  baseAmount: Amount.allow(null), // SalesPriceListLine.priceAmount.baseAmount
  reportingAmount: Amount,
  fractionDigits: DecimalPlaces,
  symbol: Joi.string()
}).options({ presence: "required" }).unknown(true);

// * Extend Joi

Joi.amount = name => ({[name]: AmountObject, [name + "Amount"]: Amount});

/**
 * Primavera API Resources
 */

const DocumentStatus = Joi.number().integer().valid(1, 2);
const DocumentLineStatus = Joi.number().integer().valid(1, 2);
const ItemType = Joi.number().integer().valid(1, 2);
const OrderNature = Joi.number().integer().valid(1, 2);

// * /corePatterns

/**
 * Validator for required fields of CurrencyResource
 * GET /corePatterns/currencies
 */
const Currency = Joi.object({
  id: Joi.string().uuid(),
  currencyKey: Joi.string(), // PRIMARY KEY Currency
  description: Joi.string(),
  currencyUnit: Joi.string(),
  isoCode: Joi.string(),
  symbol: Joi.string(),
  fractionDigits: DecimalPlaces,
  isExternallyManaged: Joi.boolean(),

  currencySubUnit: Joi.string().allow("").optional(),
  validFrom: Joi.date().optional(),
  validTo: Joi.date().optional(),
  pricesFractionDigits: DecimalPlaces.optional(),
}).required().options({ presence: "required" }).unknown(true);

/**
 * Validator for required fields of CountryResource
 * GET /corePatterns/countries
 */
const Country = Joi.object({
  id: Joi.string().uuid(),
  countryKey: Joi.string(), // PRIMARY KEY Country
  culture: Joi.string(), // Culture
  name: Joi.string(),
  eU: Joi.boolean(),
  isExternallyManaged: Joi.boolean(),
}).required().options({ presence: "required" }).unknown(true);

// * /businessCore

/**
 * Validator for required fields of PartyResource
 * GET /businessCore/parties
 */
const Party = Joi.object({
  id: Joi.string().uuid(),
  partyKey: Joi.string(), // PRIMARY KEY Party
  currency: Joi.string(), // Currency
  country: Joi.string(), // Country
  name: Joi.string(),
  isPerson: Joi.boolean(),
  isExternallyManaged: Joi.boolean(),

  partyAddresses: Joi.array().optional(),
  partyContacts: Joi.array().optional(),
  address: Joi.string().optional().allow(null), // Address
  contact: Joi.string().optional().allow(null), // Contact
  culture: Joi.string().optional().allow(null), // Culture
}).required().options({ presence: "required" }).unknown(true);

/**
 * Validator for required fields of ItemResource
 * GET /businessCore/items
 */
const Item = Joi.object({
  id: Joi.string().uuid(),
  itemKey: Joi.string(), // PRIMARY KEY Item
  baseUnit: Joi.string(), // Unit
  itemType: ItemType,
  isExternallyManaged: Joi.boolean(),

  externalId: Joi.string().optional().allow(null),
  externalVersion: Joi.string().optional().allow(null),

  description: Joi.string().optional().allow(null),
  brand: Joi.string().optional().allow(null), // Brand
  image: Joi.string().uri().optional().allow(null),
  imageThumbnail: Joi.string().uri().optional().allow(null),
}).required().options({ presence: "required" }).unknown(true);

const Entity = Party;

// * /financialCore

/**
 * Validator for required fields of PaymentTermResource
 * GET /financialCore/paymentTerms
 */
const PaymentTerm = Joi.object({
  id: Joi.string().uuid(),
  paymentTermKey: Joi.string(), // PRIMARY KEY PaymentTerm
  description: Joi.string(),
  useInAccountsReceivable: Joi.boolean(),
  useInAccountsPayable: Joi.boolean(),

  validFrom: Joi.date().optional().allow(null),
  validTo: Joi.date().optional().allow(null),
  daysFromReferenceDate: Joi.number().integer().min(0),
}).required().options({ presence: "required" }).unknown(true);

// Cash, Check, PayPal, Other, BankTransfer, DirectDebit
const PaymentMethodType = Joi.number().integer().valid(1, 2, 5, 4, 6, 7);

/**
 * Validator for required fields of PaymentMethodResource
 * GET /financialCore/paymentMethods
 */
const PaymentMethod = Joi.object({
  id: Joi.string().uuid(),
  paymentMethodsKey: Joi.string(), // PRIMARY KEY PaymentMethod
  isAvailableInSales: Joi.boolean(),
  isAvailableInPurchases: Joi.boolean(),
  isAllowedInPettyCash: Joi.boolean(),
  isAllowedInFinancialAccount: Joi.boolean(),
  isAvailableInOnLineStore: Joi.boolean(),
  balanceManaged: Joi.boolean(),
  valueDateOffset: Joi.number().integer().min(0),
  paymentMethodType: PaymentMethodType,
  isEft: Joi.boolean(), // is electronic funds transfer

  description: Joi.string().optional().allow(null),
}).required().options({ presence: "required" }).unknown(true);

/**
 * Validator for required fields of OrderLineResource (Purchases)
 * PurchaseOrder.documentLines[]
 */
const PurchaseOrderLine = Joi.object({
  id: Joi.string().uuid(),
  orderId: Joi.string(), // PurchaseOrder
  description: Joi.string(),
  currency: Joi.string(), // Currency
  unit: Joi.string(), // Unit
  itemTaxSchema: Joi.string(), // ItemTaxSchema
  partyTaxSchema: Joi.string(), // PartyTaxSchema
  purchasesItem: Joi.string(), // PurchaseItem
  // salesItem: Joi.string(),
  quantity: Decimal,
  deliveryDate: Joi.date(),

  grossValue: AmountObject,
  grossValueAmount: Amount,
  allowanceChargeAmount: AmountObject,
  allowanceChargeAmountAmount: Amount,
  taxExclusiveAmount: AmountObject,
  taxExclusiveAmountAmount: Amount,
  taxTotal: AmountObject,
  taxTotalAmount: Amount,
  lineExtensionAmount: AmountObject,
  lineExtensionAmountAmount: Amount,
  unitPrice: AmountObject,
  unitPriceAmount: Amount,

  documentLineStatus: DocumentLineStatus,
  itemType: ItemType,
  invoicedQuantity: Decimal,
  invoicedQuantityDecimalPlaces: DecimalPlaces.optional(),
  receivedQuantity: Decimal,
  receivedQuantityDecimalPlaces: DecimalPlaces.optional(),
  // deliveredQuantity: Decimal,
  // deliveredQuantityDecimalPlaces: DecimalPlaces.optional(),
}).required().options({ presence: "required" }).unknown(true);

/**
 * Validator for required fields of OrderResource (Purchases)
 * GET /purchases/orders
 */
const PurchaseOrder = Joi.object({
  id: Joi.string().uuid(),
  naturalKey: Joi.string(), // PRIMARY KEY PurchaseOrder
  documentType: Joi.string(), // OrderType
  company: Joi.string(), // Company
  serie: Joi.string(), // Serie
  seriesNumber: SeriesNumber,
  sellerSupplierParty: Joi.string(), // SupplierParty
  sellerSupplierPartyName: Joi.string(),
  sellerSupplierPartyAddress: Joi.string(),
  accountingParty: Joi.string(), // AccountingParty
  currency: Joi.string(), // Currency
  paymentMethod: Joi.string(), // PaymentMethod
  paymentTerm: Joi.string(), // PaymentTerm
  documentDate: Joi.date(),
  postingDate: Joi.date(),
  // exchangeRate: Decimal,
  // discount: Decimal,

  grossValue: AmountObject,
  grossValueAmount: Amount,
  allowanceChargeAmount: AmountObject,
  allowanceChargeAmountAmount: Amount,
  taxExclusiveAmount: AmountObject,
  taxExclusiveAmountAmount: Amount,
  taxTotal: AmountObject,
  taxTotalAmount: Amount,
  payableAmount: AmountObject,
  payableAmountAmount: Amount,

  documentStatus: DocumentStatus,
  orderNature: OrderNature,
  deliveryOnInvoice: Joi.boolean(),
  loadingCountry: Joi.string(), // Country
  unloadingCountry: Joi.string(), // Country

  documentLines: Joi.array().items(PurchaseOrderLine.optional()).optional(),
}).required().options({ presence: "required" }).unknown(true);

/**
 * Validator for required fields of OrderLineResource (Sales)
 * SalesOrder.documentLines[]
 */
const SalesOrderLine = Joi.object({
  id: Joi.string().uuid(),
  orderId: Joi.string(), // SalesOrder
  description: Joi.string(),
  currency: Joi.string(), // Currency
  unit: Joi.string(), // Unit
  itemTaxSchema: Joi.string(), // ItemTaxSchema
  partyTaxSchema: Joi.string(), // PartyTaxSchema
  // purchasesItem: Joi.string(),
  salesItem: Joi.string(), // SalesItem
  quantity: Decimal,
  deliveryDate: Joi.date(),

  grossValue: AmountObject,
  grossValueAmount: Amount,
  allowanceChargeAmount: AmountObject,
  allowanceChargeAmountAmount: Amount,
  taxExclusiveAmount: AmountObject,
  taxExclusiveAmountAmount: Amount,
  taxTotal: AmountObject,
  taxTotalAmount: Amount,
  lineExtensionAmount: AmountObject,
  lineExtensionAmountAmount: Amount,
  unitPrice: AmountObject,
  unitPriceAmount: Amount,

  documentLineStatus: DocumentLineStatus,
  itemType: ItemType,
  invoicedQuantity: Decimal,
  invoicedQuantityDecimalPlaces: DecimalPlaces.optional(),
  // receivedQuantity: Decimal,
  // receivedQuantityDecimalPlaces: DecimalPlaces.optional(),
  deliveredQuantity: Decimal,
  deliveredQuantityDecimalPlaces: DecimalPlaces.optional(),
}).required().options({ presence: "required" }).unknown(true);

/**
 * Validator for required fields of OrderResource (Sales)
 * GET /sales/orders
 */
const SalesOrder = Joi.object({
  id: Joi.string().uuid(),
  naturalKey: Joi.string(), // PRIMARY KEY SalesOrder
  documentType: Joi.string(), // OrderType
  // company: Joi.string(), // PurchaseOrder
  serie: Joi.string(), // Serie
  seriesNumber: SeriesNumber,
  buyerCustomerParty: Joi.string(), // CustomerParty
  buyerCustomerPartyName: Joi.string(),
  buyerCustomerPartyAddress: Joi.string(),
  accountingParty: Joi.string(), // Party
  currency: Joi.string(), // Currency
  paymentMethod: Joi.string(), // PaymentMethod
  paymentTerm: Joi.string(), // PaymentTerm
  documentDate: Joi.date(),
  postingDate: Joi.date(),
  exchangeRate: Decimal,
  discount: Decimal,

  grossValue: AmountObject,
  grossValueAmount: Amount,
  allowanceChargeAmount: AmountObject,
  allowanceChargeAmountAmount: Amount,
  taxExclusiveAmount: AmountObject,
  taxExclusiveAmountAmount: Amount,
  taxTotal: AmountObject,
  taxTotalAmount: Amount,
  payableAmount: AmountObject,
  payableAmountAmount: Amount,

  documentStatus: DocumentStatus,
  orderNature: OrderNature,
  deliveryOnInvoice: Joi.boolean(),
  // loadingCountry: Joi.string(),
  // unloadingCountry: Joi.string(),

  documentLines: Joi.array().items(SalesOrderLine.optional()).optional(),
}).required().options({ presence: "required" }).unknown(true);

/**
 * Validator for required fields of PurchasesItemResource
 * GET /purchasesCore/purchasesItems/extension
 */
const PurchaseItem = Joi.object({
  id: Joi.string().uuid(),
  itemKey: Joi.string(), // PRIMARY KEY PurchaseItem
  unit: Joi.string(), // Unit
  currency: Joi.string(), // Currency
  itemTaxSchema: Joi.string(), // ItemTaxSchema
  expenseAccount: Joi.string(), // Account
  // incomeAccount: Joi.string(),

  lastPrice: AmountObject,
  lastPriceAmount: Amount,

  // priceListLines: Joi.array()...
}).required().options({ presence: "required" }).unknown(true);

/**
 * Validator for required fields of PriceListLineResource
 * SalesItem.priceListLines[]
 */
const SalesPriceListLine = Joi.object({
  unit: Joi.string(), // Unit
  currency: Joi.string(), // Currency

  priceAmount: AmountObject,
  priceAmountAmount: Amount,

  priceList: Joi.string().optional(), // PriceList
}).required().options({ presence: "required" }).unknown(true);

/**
 * Validator for required fields of SalesItemResource
 * GET /salesCore/salesItems/extension
 */
const SalesItem = Joi.object({
  id: Joi.string().uuid(),
  itemKey: Joi.string(), // PRIMARY KEY SalesItem
  unit: Joi.string(), // Unit
  // currency: Joi.string(),
  itemTaxSchema: Joi.string(), // ItemTaxSchema
  // expenseAccount: Joi.string(),
  incomeAccount: Joi.string(), // Account,

  // lastPrice: AmountObject,
  // lastPriceAmount: Amount,

  priceListLines: Joi.array().items(SalesPriceListLine).optional().allow(null),
}).required().options({ presence: "required" }).unknown(true);

/**
 * Validator for required fields of InvoiceLineResource (Purchases)
 * PurchaseInvoice.documentLines[]
 */
const PurchaseInvoiceLine = Joi.object({
  id: Joi.string().uuid(),
  description: Joi.string(),
  invoiceId: Joi.string().uuid(), // PurchaseInvoice
  purchasesItem: Joi.string(), // PurchaseItem
  // salesItem: Joi.string(),
  unit: Joi.string(), // Unit
  itemTaxSchema: Joi.string(), // ItemTaxSchema
  partyTaxSchema: Joi.string(), // PartyTaxSchema
  currency: Joi.string(), // Currency
  deliveryDate: Joi.date(),
  quantity: Decimal,

  grossValue: AmountObject,
  grossValueAmount: Amount,
  allowanceChargeAmount: AmountObject,
  allowanceChargeAmountAmount: Amount,
  taxExclusiveAmount: AmountObject,
  taxExclusiveAmountAmount: Amount,
  taxTotal: AmountObject,
  taxTotalAmount: Amount,
  unitCost: AmountObject,
  unitCostAmount: Amount,
  unitPrice: AmountObject,
  unitPriceAmount: Amount,

  conversionFactor: Decimal,
  conversionFactorDecimalPlaces: DecimalPlaces.optional(),
  documentLineStatus: DocumentLineStatus,
  itemType: ItemType,
  warehouse: Joi.string().optional().allow(null), // Warehouse
  // delivery: Joi.string().optional().allow(null),
}).required().options({ presence: "required" }).unknown(true);

/**
 * Validator for required fields of InvoiceResource (Purchases)
 * GET /invoiceReceipt/invoices
 */
const PurchaseInvoice = Joi.object({
  id: Joi.string().uuid(),
  naturalKey: Joi.string(), // PRIMARY KEY PurchaseInvoice
  documentType: Joi.string(), // InvoiceType
  company: Joi.string(), // Company
  serie: Joi.string(), // Serie
  seriesNumber: SeriesNumber,
  sellerSupplierParty: Joi.string(), // SupplierParty
  accountingParty: Joi.string(), // Party
  // buyerCustomerParty: Joi.string(),
  paymentTerm: Joi.string(), // PaymentTerm
  paymentMethod: Joi.string(), // PaymentMethod
  currency: Joi.string(), // Currency
  documentDate: Joi.date(),
  postingDate: Joi.date(),
  exchangeRate: Decimal,

  grossValue: AmountObject,
  grossValueAmount: Amount,
  allowanceChargeAmount: AmountObject,
  allowanceChargeAmountAmount: Amount,
  taxExclusiveAmount: AmountObject,
  taxExclusiveAmountAmount: Amount,
  taxTotal: AmountObject,
  taxTotalAmount: Amount,
  payableAmount: AmountObject,
  payableAmountAmount: Amount,
  wTaxTotal: AmountObject,
  wTaxTotalAmount: Amount,
  totalLiability: AmountObject,
  totalLiabilityAmount: Amount,
  discountInValueAmount: AmountObject,
  discountInValueAmountAmount: Amount,

  discount: Decimal,
  cashInvoice: Joi.boolean(),
  documentStatus: DocumentStatus,
  isTransformed: Joi.boolean(),
  loadingCountry: Joi.string(), // Country
  unloadingCountry: Joi.string(), // Country

  documentLines: Joi.array().items(PurchaseInvoiceLine.optional()).optional(),
}).required().options({ presence: "required" }).unknown(true);

/**
 * Validator for required fields of InvoiceLineResource (Sales)
 * SalesInvoice.documentLines[]
 */
const SalesInvoiceLine = Joi.object({
  id: Joi.string().uuid(),
  description: Joi.string(),
  // purchasesItem: Joi.string(),
  invoiceId: Joi.string().uuid(), // SalesInvoice
  salesItem: Joi.string(), // SalesItem
  unit: Joi.string(), // Unit
  itemTaxSchema: Joi.string(), // ItemTaxSchema
  partyTaxSchema: Joi.string(), // PartyTaxSchema
  currency: Joi.string(), // Currency
  deliveryDate: Joi.date(),
  quantity: Decimal,

  grossValue: AmountObject,
  grossValueAmount: Amount,
  allowanceChargeAmount: AmountObject,
  allowanceChargeAmountAmount: Amount,
  taxExclusiveAmount: AmountObject,
  taxExclusiveAmountAmount: Amount,
  taxTotal: AmountObject,
  taxTotalAmount: Amount,
  unitPrice: AmountObject,
  unitPriceAmount: Amount,

  // conversionFactor: Decimal,
  // conversionFactorDecimalPlaces: DecimalPlaces.optional(),
  documentLineStatus: DocumentLineStatus.optional(),
  itemType: ItemType,
  // warehouse: Joi.string().optional().allow(null),
  delivery: Joi.string().optional().allow(null), // Delivery
}).required().options({ presence: "required" }).unknown(true);

/**
 * Validator for required fields of InvoiceResource (Sales)
 * GET /billing/invoices
 */
const SalesInvoice = Joi.object({
  id: Joi.string().uuid(),
  naturalKey: Joi.string(), // PRIMARY KEY SalesInvoice
  documentType: Joi.string(), // InvoiceType
  company: Joi.string(), // Company (memo)
  serie: Joi.string(), // Serie
  seriesNumber: SeriesNumber,
  buyerCustomerParty: Joi.string(), // CustomerParty
  accountingParty: Joi.string(), // Party
  // sellerSupplierParty: Joi.string(),
  paymentTerm: Joi.string(), // PaymentTerm
  paymentMethod: Joi.string(), // PaymentMethod
  currency: Joi.string(), // Currency
  documentDate: Joi.date(),
  postingDate: Joi.date(),
  exchangeRate: Decimal,

  grossValue: AmountObject,
  grossValueAmount: Amount,
  allowanceChargeAmount: AmountObject,
  allowanceChargeAmountAmount: Amount,
  taxExclusiveAmount: AmountObject,
  taxExclusiveAmountAmount: Amount,
  taxTotal: AmountObject,
  taxTotalAmount: Amount,
  payableAmount: AmountObject,
  payableAmountAmount: Amount,
  wTaxTotal: AmountObject,
  wTaxTotalAmount: Amount,
  totalLiability: AmountObject,
  totalLiabilityAmount: Amount,
  discountInValueAmount: AmountObject,
  discountInValueAmountAmount: Amount,

  discount: Decimal,
  cashInvoice: Joi.boolean(),
  documentStatus: DocumentStatus,
  isTransformed: Joi.boolean(),
  isSimpleInvoice: Joi.boolean(),
  loadingCountry: Joi.string(), // Country
  unloadingCountry: Joi.string(), // Country

  documentLines: Joi.array().items(SalesInvoiceLine.optional()).optional(),
}).required().options({ presence: "required" }).unknown(true);

function validateArray(schema, response, res, next) {
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

const validatorRouteMap = {
  "/corePatterns/currencies/odata": Currency,
  "/corePatterns/countries/odata": Country,
  "/businessCore/parties/odata": Party,
  "/businessCore/items/odata": Item,
  "/financialCore/paymentTerms": PaymentTerm,
  "/financialCore/paymentMethods": PaymentMethod,
  "/purchases/orders/odata": PurchaseOrder,
  "/sales/orders/odata": SalesOrder,
  "/purchasesCore/purchasesItems/extension/odata": PurchaseItem,
  "/salesCore/salesItems/extension/odata": SalesItem,
  "/invoiceReceipt/invoices/odata": PurchaseInvoice,
  "/billing/invoices/odata": SalesInvoice,
};

module.exports = {
  validatorRouteMap,
  validateArray,
  Currency,
  Party,
  Country,
  PurchaseOrder,
  PurchaseOrderLine,
  PurchaseItem,
  PurchaseInvoice,
  PurchaseInvoiceLine,
  SalesOrder,
  SalesOrderLine,
  SalesPriceListLine,
  SalesItem,
  SalesInvoice,
  SalesInvoiceLine,
};
