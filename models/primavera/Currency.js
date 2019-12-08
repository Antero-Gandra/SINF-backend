const Joi = require("@hapi/joi");
const { DecimalPlaces } = require("./common");

/**
 * Validator for required fields of CurrencyResource
 * GET /corePatterns/currencies
 */
const Currency = Joi.object({
  id: Joi.string().uuid(), // Currency
  currencyKey: Joi.string(), // PRIMARY KEY Currency

  description: Joi.string(),
  currencyUnit: Joi.string(),
  isoCode: Joi.string(),
  symbol: Joi.string(),
  fractionDigits: DecimalPlaces,
  isExternallyManaged: Joi.boolean(),

  currencySubUnit: Joi.string().optional().allow(""),
  validFrom: Joi.date().optional(),
  validTo: Joi.date().optional(),
  pricesFractionDigits: DecimalPlaces.optional(),
}).required().options({ presence: "required" }).unknown(true);

module.exports = Currency;
