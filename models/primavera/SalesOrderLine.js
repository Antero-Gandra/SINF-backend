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
 * Validator for required fields of OrderLineResource (Sales)
 * SalesOrder.documentLines[]
 */
const SalesOrderLine = Joi.object({
  id: Joi.string().uuid(),
  description: Joi.string(),

  orderId: Joi.string(), // SalesOrder

  currency: Joi.string(), // Currency
  currencyId: Joi.string().uuid(),

  unit: Joi.string(), // Unit
  unitId: Joi.string().uuid(),

  itemTaxSchema: Joi.string(), // ItemTaxSchema
  itemTaxSchemaId: Joi.string().uuid(),

  partyTaxSchema: Joi.string(), // PartyTaxSchema
  partyTaxSchemaId: Joi.string().uuid(),

  // purchasesItem: Joi.string(),
  // purchasesItemId: Joi.string().uuid(),
  salesItem: Joi.string(), // SalesItem
  salesItemId: Joi.string().uuid(),

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

module.exports = SalesOrderLine;
