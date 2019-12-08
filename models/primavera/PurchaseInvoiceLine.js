const Joi = require("@hapi/joi");
const {
  Amount,
  AmountObject,
  Decimal,
  DecimalPlaces,
  DocumentLineStatus,
  ItemType,
} = require("./Core");

/**
 * Validator for required fields of InvoiceLineResource (Purchases)
 * PurchaseInvoice.documentLines[]
 */
const PurchaseInvoiceLine = Joi.object({
  id: Joi.string().uuid(),
  description: Joi.string(),

  invoiceId: Joi.string().uuid(), // PurchaseInvoice

  purchasesItem: Joi.string(), // PurchaseItem
  purchasesItemId: Joi.string().uuid(),
  // salesItem: Joi.string(),
  // salesItemId: Joi.string().uuid(),

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
  unitCost: AmountObject,
  unitCostAmount: Amount,
  unitPrice: AmountObject,
  unitPriceAmount: Amount,

  conversionFactor: Decimal,
  conversionFactorDecimalPlaces: DecimalPlaces.optional(),
  documentLineStatus: DocumentLineStatus,
  itemType: ItemType,

  warehouse: Joi.string().optional().empty(null), // Warehouse
  warehouseId: Joi.string().uuid().optional().empty(null),
  // delivery: Joi.string().optional().empty(null),
  // deliveryId: Joi.string().uuid().optional().empty(null)
}).required().options({ presence: "required" }).unknown(true);

module.exports = PurchaseInvoiceLine;
