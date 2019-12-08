const Joi = require("@hapi/joi");
const {
  Amount,
  AmountObject,
  Decimal,
  DocumentStatus,
  SeriesNumber
} = require("./common");
const SalesInvoiceLine = require("./SalesInvoiceLine");

/**
 * Validator for required fields of InvoiceResource (Sales)
 * GET /billing/invoices
 */
const SalesInvoice = Joi.object({
  id: Joi.string().uuid(),
  naturalKey: Joi.string(), // PRIMARY KEY SalesInvoice

  documentType: Joi.string(), // InvoiceType
  documentTypeId: Joi.string().uuid(),

  company: Joi.string(), // Company (memo)
  companyId: Joi.string().uuid(),

  serie: Joi.string(), // Serie
  serieId: Joi.string().uuid(),
  seriesNumber: SeriesNumber,

  // sellerSupplierParty: Joi.string(),
  // sellerSupplierPartyId: Joi.string().uuid(),
  buyerCustomerParty: Joi.string(), // CustomerParty
  buyerCustomerPartyId: Joi.string().uuid(),

  accountingParty: Joi.string(), // Party
  accountingPartyId: Joi.string().uuid(),

  paymentTerm: Joi.string(), // PaymentTerm
  paymentTermId: Joi.string().uuid(),

  paymentMethod: Joi.string(), // PaymentMethod
  paymentMethodId: Joi.string().uuid(),

  currency: Joi.string(), // Currency
  currencyId: Joi.string().uuid(),

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
  loadingCountryId: Joi.string().uuid(),
  unloadingCountry: Joi.string(), // Country
  unloadingCountryId: Joi.string().uuid(),

  documentLines: Joi.array().items(SalesInvoiceLine.optional()).optional(),
}).required().options({ presence: "required" }).unknown(true);

module.exports = SalesInvoice;
