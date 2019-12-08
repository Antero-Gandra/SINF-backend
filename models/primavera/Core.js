const Joi = require("@hapi/joi");

// note: prettier is disabled for this file

// * Auxiliary validators

const Amount = Joi.number().min(0);
const Decimal = Joi.number().min(0);
const SeriesNumber = Joi.number().positive();
const DecimalPlaces = Joi.number().integer().min(0);

const AmountObject = Joi.object({
  amount: Amount,
  baseAmount: Amount.allow(null),
  reportingAmount: Amount,
  fractionDigits: DecimalPlaces,
  symbol: Joi.string().allow("", null)
}).options({ presence: "required" }).unknown(true);

// * Extend Joi

Joi.amount = name => ({[name]: AmountObject, [name + "Amount"]: Amount});
Joi.strict = object => Joi.object(object).required().options({
  presence: "required"
}).unknown(true);

/**
 * Primavera API Enumerations
 */

const DocumentStatus = Joi.number().integer().valid(1, 2);
const DocumentLineStatus = Joi.number().integer().valid(1, 2);
const ItemType = Joi.number().integer().valid(1, 2);
const OrderNature = Joi.number().integer().valid(1, 2);

module.exports = {
  AmountObject,
  Amount,
  Decimal,
  DecimalPlaces,
  SeriesNumber,
  DocumentStatus,
  DocumentLineStatus,
  ItemType,
  OrderNature
};
