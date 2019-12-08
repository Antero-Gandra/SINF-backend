const Joi = require("@hapi/joi");
const {
  Amount,
  AmountObject,
  DocumentStatus,
  OrderNature,
  SeriesNumber
} = require("./Core");
const PurchaseOrderLine = require("./PurchaseOrderLine");

/**
 * Validator for required fields of OrderResource (Purchases)
 * GET /purchases/orders
 */
const PurchaseOrder = Joi.object({
  id: Joi.string().uuid(),
  naturalKey: Joi.string(), // PRIMARY KEY PurchaseOrder

  documentType: Joi.string(), // OrderType
  documentTypeId: Joi.string().uuid(),

  company: Joi.string(), // Company
  companyId: Joi.string().uuid(),

  serie: Joi.string(), // Serie
  serieId: Joi.string().uuid(),
  seriesNumber: SeriesNumber,

  sellerSupplierParty: Joi.string(), // SupplierParty
  sellerSupplierPartyId: Joi.string().uuid(),
  sellerSupplierPartyName: Joi.string(),
  sellerSupplierPartyAddress: Joi.string(),

  accountingParty: Joi.string(), // AccountingParty
  accountingPartyId: Joi.string().uuid(),

  currency: Joi.string(), // Currency
  currencyId: Joi.string().uuid(),

  paymentMethod: Joi.string(), // PaymentMethod
  paymentMethodId: Joi.string().uuid(),

  paymentTerm: Joi.string(), // PaymentTerm
  paymentTermId: Joi.string().uuid(),

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
  loadingCountryId: Joi.string().uuid(),
  unloadingCountry: Joi.string(), // Country
  unloadingCountryId: Joi.string().uuid(),

  documentLines: Joi.array().items(PurchaseOrderLine.optional()).optional(),
}).required().options({ presence: "required" }).unknown(true);

module.exports = PurchaseOrder;
