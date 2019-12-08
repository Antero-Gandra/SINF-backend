const Joi = require("@hapi/joi");
const {
  Amount,
  AmountObject,
  Decimal,
  DocumentLineStatus,
  ItemType,
} = require("./Core");

/**
 * Validator for required fields of InvoiceLineResource (Sales)
 * SalesInvoice.documentLines[]
 */
const SalesInvoiceLine = Joi.strict({
  id: Joi.string().uuid(),
  description: Joi.string(),

  invoiceId: Joi.string().uuid(), // SalesInvoice

  // purchasesItem: Joi.string(),
  // purchasesItemId: Joi.string().uuid(),
  salesItem: Joi.string(), // SalesItem
  salesItemId: Joi.string().uuid(),

  unit: Joi.string(), // Unit
  unitId: Joi.string().uuid(),

  itemTaxSchema: Joi.string(), // ItemTaxSchema
  itemTaxSchemaId: Joi.string().uuid(),

  partyTaxSchema: Joi.string(), // PartyTaxSchema
  partyTaxSchemaId: Joi.string().uuid(),

  currency: Joi.string(), // Currency
  currencyId: Joi.string().uuid(),

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

  // warehouse: Joi.string().optional().empty(null),
  // warehouseId: Joi.string().uuid().optional().empty(null),
  delivery: Joi.string().optional().empty(null), // Delivery
  deliveryId: Joi.string().uuid().optional().empty(null), // Delivery
});

module.exports = SalesInvoiceLine;
