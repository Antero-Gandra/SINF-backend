const Joi = require("@hapi/joi");
const {
  Amount,
  AmountObject,
  Decimal,
  DocumentStatus,
  OrderNature,
  SeriesNumber
} = require("./common");
const SalesOrderLine = require("./SalesOrderLine");

/**
 * Validator for required fields of OrderResource (Sales)
 * GET /sales/orders
 */
const SalesOrder = Joi.object({
  id: Joi.string().uuid(),
  naturalKey: Joi.string(), // PRIMARY KEY SalesOrder

  documentType: Joi.string(), // OrderType
  documentTypeId: Joi.string().uuid(),

  // company: Joi.string(), // PurchaseOrder
  // companyId: Joi.string().uuid(),

  serie: Joi.string(), // Serie
  serieId: Joi.string().uuid(),
  seriesNumber: SeriesNumber,

  buyerCustomerParty: Joi.string(), // CustomerParty
  buyerCustomerPartyId: Joi.string().uuid(),
  buyerCustomerPartyName: Joi.string(),
  buyerCustomerPartyAddress: Joi.string(),

  accountingParty: Joi.string(), // Party
  accountingPartyId: Joi.string().uuid(),

  currency: Joi.string(), // Currency
  currencyId: Joi.string().uuid(),

  paymentMethod: Joi.string(), // PaymentMethod
  paymentMethodId: Joi.string().uuid(),

  paymentTerm: Joi.string(), // PaymentTerm
  paymentTermId: Joi.string().uuid(),

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
  // loadingCountryId: Joi.string().uuid(),
  // unloadingCountry: Joi.string(),
  // unloadingCountryId: Joi.string().uuid(),

  documentLines: Joi.array().items(SalesOrderLine.optional()).optional(),
}).required().options({ presence: "required" }).unknown(true);

module.exports = SalesOrder;
